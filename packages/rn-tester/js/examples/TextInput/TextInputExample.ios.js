/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

import type {
  RNTesterModule,
  RNTesterModuleExample,
} from '../../types/RNTesterTypes';
import type {KeyboardType} from 'react-native/Libraries/Components/TextInput/TextInput';

import ExampleTextInput from './ExampleTextInput';

const TextInputSharedExamples = require('./TextInputSharedExamples.js');
const React = require('react');
const {
  Alert,
  Button,
  InputAccessoryView,
  StyleSheet,
  Switch,
  Text,
  View,
} = require('react-native');

class WithLabel extends React.Component<$FlowFixMeProps> {
  render(): React.Node {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.label}>
          <Text>{this.props.label}</Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

class TextInputAccessoryViewChangeTextExample extends React.Component<
  {...},
  {text: string},
> {
  constructor(props: void | {...}) {
    // $FlowFixMe[incompatible-call]
    super(props);
    this.state = {text: 'Placeholder Text'};
  }

  render(): React.Node {
    const inputAccessoryViewID = 'inputAccessoryView1';
    return (
      <View>
        <Text>Set InputAccessoryView with ID & reset text:</Text>
        <ExampleTextInput
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={text => this.setState({text})}
          value={this.state.text}
        />
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View style={{backgroundColor: 'white'}}>
            <Button
              onPress={() => this.setState({text: 'Placeholder Text'})}
              title="Reset Text"
            />
          </View>
        </InputAccessoryView>
      </View>
    );
  }
}

class TextInputAccessoryViewChangeKeyboardExample extends React.Component<
  {...},
  {keyboardType: string, text: string},
> {
  constructor(props: void | {...}) {
    // $FlowFixMe[incompatible-call]
    super(props);
    this.state = {text: '', keyboardType: 'default'};
  }

  _switchKeyboard = () => {
    this.setState({
      keyboardType:
        this.state.keyboardType === 'default' ? 'number-pad' : 'default',
    });
  };

  render(): React.Node {
    const inputAccessoryViewID = 'inputAccessoryView2';
    return (
      <View>
        <Text>Set InputAccessoryView with ID & switch keyboard:</Text>
        {/* $FlowFixMe[incompatible-use] */}
        <ExampleTextInput
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={text => this.setState({text})}
          value={this.state.text}
          // $FlowFixMe[incompatible-type]
          keyboardType={this.state.keyboardType}
          returnKeyType="done"
        />
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View style={{backgroundColor: 'white'}}>
            <Button onPress={this._switchKeyboard} title="Switch Keyboard" />
          </View>
        </InputAccessoryView>
      </View>
    );
  }
}

class TextInputAccessoryViewDefaultDoneButtonExample extends React.Component<
  $ReadOnly<{|
    keyboardType: KeyboardType,
  |}>,
  {text: string},
> {
  constructor(props: void | $ReadOnly<{keyboardType: KeyboardType}>) {
    // $FlowFixMe[incompatible-call]
    super(props);
    this.state = {text: ''};
  }

  render(): React.Node {
    return (
      <ExampleTextInput
        onChangeText={text => this.setState({text})}
        value={this.state.text}
        keyboardType={this.props.keyboardType}
        returnKeyType="done"
      />
    );
  }
}

class RewriteExampleKana extends React.Component<$FlowFixMeProps, any> {
  constructor(props: any | void) {
    super(props);
    this.state = {text: ''};
  }
  render(): React.Node {
    return (
      <View style={styles.rewriteContainer}>
        <ExampleTextInput
          multiline={false}
          onChangeText={text => {
            this.setState({text: text.replace(/ひ/g, '日')});
          }}
          value={this.state.text}
        />
      </View>
    );
  }
}

class SecureEntryExample extends React.Component<$FlowFixMeProps, any> {
  constructor(props: any | void) {
    super(props);
    this.state = {
      text: '',
      password: '',
      isSecureTextEntry: true,
    };
  }
  render(): React.Node {
    return (
      <View>
        <ExampleTextInput
          secureTextEntry={true}
          defaultValue="abc"
          onChangeText={text => this.setState({text})}
          value={this.state.text}
        />
        <Text>Current text is: {this.state.text}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <ExampleTextInput
            defaultValue="cde"
            onChangeText={text => this.setState({password: text})}
            secureTextEntry={this.state.isSecureTextEntry}
            value={this.state.password}
          />
          <Switch
            onValueChange={value => {
              this.setState({isSecureTextEntry: value});
            }}
            style={{marginLeft: 4}}
            value={this.state.isSecureTextEntry}
          />
        </View>
      </View>
    );
  }
}

class AutogrowingTextInputExample extends React.Component<
  $FlowFixMeProps,
  $FlowFixMeState,
> {
  constructor(props: any | void) {
    super(props);

    this.state = {
      multiline: true,
      fullWidth: true,
      text: '',
      contentSize: {
        width: 0,
        height: 0,
      },
    };
  }

  UNSAFE_componentWillReceiveProps(props: any) {
    this.setState({
      multiline: props.multiline,
    });
  }

  render(): React.Node {
    const {style, multiline, ...props} = this.props;
    return (
      <View>
        <Text>Full width:</Text>
        <Switch
          value={this.state.fullWidth}
          onValueChange={value => this.setState({fullWidth: value})}
        />

        <Text>Multiline:</Text>
        <Switch
          value={this.state.multiline}
          onValueChange={value => this.setState({multiline: value})}
        />

        <Text>TextInput:</Text>
        <ExampleTextInput
          value="prop"
          multiline={this.state.multiline}
          style={[style, {width: this.state.fullWidth ? '100%' : '50%'}]}
          onChangeText={value => this.setState({text: value})}
          onContentSizeChange={event =>
            this.setState({contentSize: event.nativeEvent.contentSize})
          }
          {...props}
        />
        <Text>Plain text value representation:</Text>
        <Text>{this.state.text}</Text>
        <Text>Content Size: {JSON.stringify(this.state.contentSize)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  multiline: {
    height: 50,
    marginBottom: 4,
  },
  multilinePlaceholderStyles: {
    letterSpacing: 10,
    lineHeight: 20,
    textAlign: 'center',
  },
  multilineExpandable: {
    height: 'auto',
    maxHeight: 100,
  },
  multilineWithFontStyles: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Cochin',
    height: 60,
  },
  singlelinePlaceholderStyles: {
    letterSpacing: 10,
    textAlign: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  label: {
    width: 115,
    alignItems: 'flex-end',
    marginRight: 10,
    paddingTop: 2,
  },
  rewriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remainder: {
    textAlign: 'right',
    width: 24,
  },
});

const textInputExamples: Array<RNTesterModuleExample> = [
  ...TextInputSharedExamples,
];

module.exports = ({
  displayName: (undefined: ?string),
  title: 'TextInput',
  documentationURL: 'https://reactnative.dev/docs/TextInput',
  category: 'Basic',
  description: 'Single and multi-line text inputs.',
  examples: textInputExamples,
}: RNTesterModule);
