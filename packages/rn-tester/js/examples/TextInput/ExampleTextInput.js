/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 * @oncall react_native
 */

import {RNTesterThemeContext} from '../../components/RNTesterTheme';
import React, {forwardRef, useContext} from 'react';
import {StyleSheet, TextInput, View, Pressable, Text} from 'react-native';

const ExampleTextInput: React.AbstractComponent<
  React.ElementConfig<typeof TextInput>,
  $ReadOnly<{|
    ...React.ElementRef<typeof TextInput>,
  |}>,
> = forwardRef((props, ref) => {
  const theme = useContext(RNTesterThemeContext);

  const [description, setDescription] = React.useState<string>('0123456789');
  const [description1, setDescription1] = React.useState<string>('12345');

  return (
    <View style={{flex: 1}}>
      <Pressable
        style={{
          marginTop: 30,
          marginBottom: 30,
        }}
        onPress={() => {
          setDescription('01234567890');
          setDescription1('098765');
        }}>
        <Text> Change Text </Text>
      </Pressable>
      <TextInput
        // ref={ref}
        // {...props}
        selectTextOnFocus={true}
        value={description}
        multiline={true}
        onChangeText={text => {
          console.log('## On Change Text Received');
          setDescription('0123456789');
        }}
        style={[
          {
            color: theme.LabelColor,
            backgroundColor: theme.SecondaryGroupedBackgroundColor,
            borderColor: theme.QuaternaryLabelColor,
          },
          styles.input,
          props.style,
        ]}
      />

      <TextInput
        // ref={ref}
        // {...props}
        selectTextOnFocus={true}
        value={description1}
        multiline={true}
        autoFocus={true}
        onChangeText={text => {
          console.log('## 2 On Change Text Received');
          setDescription1('45637289');
        }}
        style={{
          marginTop: 30,
          color: 'black',
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    fontSize: 13,
    flexShrink: 1,
    padding: 4,
  },
});

export default ExampleTextInput;
