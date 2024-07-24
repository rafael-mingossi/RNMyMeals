import React, {useEffect, useMemo, useState} from 'react';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ButtonRound, Calendar} from '@components';
import {supabase} from '@services';
import {PieChart} from 'react-native-gifted-charts';
import {
  Circle,
  Group,
  Path,
  Skia,
  SweepGradient,
  type Vector,
  PathOp,
  Shader,
  Canvas,
  Fill,
  vec,
} from '@shopify/react-native-skia';

type Value = string | number;
type Values = Value[];

export const glsl = (source: TemplateStringsArray, ...values: Values) => {
  const processed = source.flatMap((s, i) => [s, values[i]]).filter(Boolean);
  return processed.join('');
};

export const frag = (source: TemplateStringsArray, ...values: Values) => {
  const code = glsl(source, ...values);
  const rt = Skia.RuntimeEffect.Make(code);
  if (rt === null) {
    throw new Error("Couldn't Compile Shader");
  }
  return rt;
};

const source = frag`
uniform shader image;
uniform vec2 head;
uniform float progress;
uniform vec4 color;
uniform float r;

vec2 rotate(in vec2 coord, in float angle, vec2 origin) {
  vec2 coord1 = coord - origin;
  vec2 rotated = coord1 * mat2( cos(angle), -sin(angle),
                       sin(angle),  cos(angle));
  return rotated + origin;
 }

vec4 main(vec2 xy) {
  float d = distance(xy, head);
  vec2 rotated = rotate(xy, ${-Math.PI} - progress * ${2 * Math.PI}, head);
  if (rotated.y > head.y) {
    return vec4(0, 0, 0, 0);
  }
  if (d > r) {
    return vec4(0, 0, 0, smoothstep(35, 0, d));
  }
  if (progress > 1) {
    return color;
  }
  return image.eval(head);
}
`;

const fromCircle = (center: Vector, r: number) => {
  'worklet';
  return Skia.XYWHRect(center.x - r, center.y - r, r * 2, r * 2);
};

interface Ring {
  colors: string[];
  background: string;
  size: number;
  totalProgress: number;
}

interface RingProps {
  ring: Ring;
  center: Vector;
  strokeWidth: number;
}

const CaloriesBar = () => {
  // const data = [{value: 50}, {value: 80}, {value: 90}, {value: 70}];
  const [ad, setAd] = useState(0.001);

  const onP = () => {
    setAd(ad + 0.05);
  };

  const Ring = ({
    center,
    strokeWidth,
    ring: {size, background, totalProgress, colors},
  }: RingProps) => {
    const trim = useSharedValue(0);
    const r = size / 2 - strokeWidth / 2;
    const clip = useMemo(() => {
      const outerCircle = Skia.Path.Make();
      outerCircle.addCircle(center.x, center.y, size / 2);
      const innerCircle = Skia.Path.Make();
      innerCircle.addCircle(center.x, center.y, size / 2 - strokeWidth);
      return Skia.Path.MakeFromOp(outerCircle, innerCircle, PathOp.Difference)!;
    }, [center.x, center.y, size, strokeWidth]);

    const fullPath = useMemo(() => {
      const path = Skia.Path.Make();
      const fullRevolutions = Math.floor(totalProgress);
      for (let i = 0; i < fullRevolutions; i++) {
        path.addCircle(center.x, center.y, r);
      }
      path.addArc(fromCircle(center, r), 0, 360 * (totalProgress % 1));
      return path;
    }, [center, r, totalProgress]);
    const path = useDerivedValue(() => {
      if (trim.value < 1) {
        return fullPath.copy().trim(0, trim.value, false)!;
      }
      return fullPath;
    });

    const matrix = useDerivedValue(() => {
      const m = Skia.Matrix();
      const progress = trim.value * totalProgress;
      const angle = progress < 1 ? 0 : (progress % 1) * 2 * Math.PI;
      if (angle > 0) {
        m.translate(center.x, center.y);
        m.rotate(angle);
        m.translate(-center.x, -center.y);
      }
      return m;
    });
    const uniforms = useDerivedValue(() => {
      const head = path.value.getLastPt();
      return {
        head,
        r: strokeWidth / 2,
        progress: trim.value * totalProgress,
        color: [...Skia.Color(colors[1])],
      };
    });
    useEffect(() => {
      trim.value = withTiming(1, {duration: 3000});
    }, [trim]);
    return (
      <Group transform={[{rotate: -Math.PI / 2}]} origin={center}>
        <Group clip={clip}>
          <Fill color={background} />
          <Circle
            c={fullPath.getPoint(0)}
            r={strokeWidth / 2}
            color={colors[0]}
          />
          <Path
            path={path}
            strokeWidth={strokeWidth}
            style="stroke"
            color={colors[0]}>
            <SweepGradient colors={colors} c={center} matrix={matrix} />
          </Path>
          <Fill>
            <Shader source={source} uniforms={uniforms}>
              <SweepGradient colors={colors} c={center} matrix={matrix} />
            </Shader>
          </Fill>
        </Group>
      </Group>
    );
  };

  const {width, height} = Dimensions.get('window');
  const center = vec(width / 2, height / 3);

  const {PI} = Math;
  const TAU = 2 * PI;
  const SIZE = width - 120;
  const strokeWidth = 30;

  const color = (r: number, g: number, b: number) =>
    `rgb(${r * 255}, ${g * 255}, ${b * 255})`;

  const rings = [
    // {
    //   totalProgress: 1.3,
    //   colors: [color(0.008, 1, 0.659), color(0, 0.847, 1)],
    //   background: color(0.016, 0.227, 0.212),
    //   size: SIZE - strokeWidth * 4,
    // },
    // {
    //   totalProgress: 0.6,
    //   colors: [color(0.847, 1, 0), color(0.6, 1, 0.004)],
    //   background: color(0.133, 0.2, 0),
    //   size: SIZE - strokeWidth * 2,
    // },
    {
      totalProgress: ad,
      colors: [color(1.98, 1.067, 1.31), color(1.976, 1.22, 1.522)],
      background: '#3fae4d',
      size: SIZE,
    },
  ];

  const Rings = () => {
    return (
      <Canvas style={{flex: 0.8}}>
        <Fill color="gray" />
        {rings.map((ring, index) => {
          return (
            <Ring
              key={index}
              ring={ring}
              center={center}
              strokeWidth={strokeWidth}
            />
          );
        })}
      </Canvas>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*<ScrollView>*/}
      {/*  <Pressable onPress={async () => await supabase.auth.signOut()}>*/}
      {/*    <Text>DASH</Text>*/}
      {/*  </Pressable>*/}

      {/*  /!*<Calendar />*!/*/}

      {/*  /!*<PieChart data={data} />*!/*/}

      {/*  /!*<PieChart data={data} donut />*!/*/}
      {/*</ScrollView>*/}
      <Rings />
      <ButtonRound btnColour={'green'} onPress={onP}>
        ADD
      </ButtonRound>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default CaloriesBar;
