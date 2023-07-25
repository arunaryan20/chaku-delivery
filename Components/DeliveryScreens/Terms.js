import {StyleSheet, Text, View, TouchableOpacity, Image,ScrollView} from 'react-native';
import React from 'react';


const Terms = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MainBottom')}
        style={{height: 30, width: 30, position: 'absolute', margin: 10}}>
        <Image
          source={require('../../Assets/icons/back.png')}
          style={{height: '100%', width: '100%', tintColor: 'black'}}
        />
      </TouchableOpacity>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 18,
          padding: 10,
          color: 'black',
        }}>
        Terms and Conditions
      </Text>
      <ScrollView style={{padding:10}}>
      <Text style={{color: 'black'}}>
        Acceptance of Terms 1.1. By using our App, you represent that you are at
        least 18 years old or have reached the age of majority in your
        jurisdiction. If you are under 18 years old, please obtain parental or
        guardian consent before using the App. 1.2. These Terms may be amended
        or updated by us from time to time without notice. It is your
        responsibility to review these Terms periodically. Continued use of the
        App after any modifications to the Terms constitutes your acceptance of
        such changes. User Accounts 2.1. In order to access certain features of
        the App, you may be required to create a user account. You are solely
        responsible for maintaining the confidentiality of your account
        information, including your username and password. You agree to notify
        us immediately of any unauthorized use of your account. 2.2. You are
        responsible for all activities that occur under your account. We reserve
        the right to terminate or suspend your account at any time and for any
        reason without liability to you. Intellectual Property Rights 3.1. The
        App and all its contents, including but not limited to text, graphics,
        images, logos, and software, are the intellectual property of [Company
        Name] or its licensors. You may not modify, copy, distribute, transmit,
        display, perform, reproduce, publish, license, create derivative works
        from, transfer, or sell any information, software, products, or services
        obtained from the App without our prior written consent. 3.2. By using
        the App, you grant us a non-exclusive, worldwide, royalty-free,
        sublicensable, and transferable license to use, modify, adapt,
        reproduce, distribute, display, and publish any content you submit
        through the App, for the purpose of providing and promoting the
        services. User Conduct 4.1. You agree to use the App solely for lawful
        purposes and in compliance with all applicable laws and regulations.
        4.2. You shall not engage in any of the following prohibited activities:
        a. Violating any local, state, national, or international law or
        regulation. b. Interfering with or disrupting the App or servers or
        networks connected to the App. c. Uploading, transmitting, or
        distributing any harmful, infringing, or unlawful content. d.
        Impersonating any person or entity or misrepresenting your affiliation
        with any person or entity. 4.3. We reserve the right to remove any
        content or suspend or terminate your access to the App for any violation
        of these Terms or for any other reason at our sole discretion. Privacy
        5.1. Our Privacy Policy, available [provide link], governs the
        collection, use, and disclosure of your personal information. By using
        the App, you consent to the collection, use, and disclosure of your
        information as described in our Privacy Policy. Disclaimer of Warranties
        6.1. The App and its content are provided on an "as is" and "as
        available" basis without warranties of any kind. We make no
        representations or warranties, express or implied, regarding the
        accuracy, reliability, or availability of the App or its content. 6.2.
        We do not warrant that the App will be uninterrupted or error-free, that
        defects will be corrected, or that the App is free of viruses or other
        harmful components. Limitation of Liability 7.1. To the maximum extent
        permitted by applicable law, we shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages, or any loss of
        profits or revenue arising out of or in connection with your use of the
        App. 7.2. Our total liability for any claim arising out of or relating
        to the App or these Terms shall not exceed the amount you paid, if any,
        to us for the use of the App. Indemnification 8.1. You agree to
        indemnify and hold us harmless from any claim, demand, or damages,
        including reasonable attorneys' fees, arising out of or related to your
        use of the App, your violation of these Terms, or your violation of any
        rights of another party. Governing Law and Jurisdiction 9.1. These Terms
        shall be governed by and construed in accordance with the laws of
        [Jurisdiction]. Any dispute arising out of or in connection with these
        Terms shall be submitted to the exclusive jurisdiction of the courts of
        [Jurisdiction]. Severability 10.1. If any provision of these Terms is
        held to be invalid, illegal, or unenforceable, the remaining provisions
        shall continue in full force and effect. Entire Agreement 11.1. These
        Terms constitute the entire agreement between you and [Company Name]
        regarding the App and supersede all prior or contemporaneous
        understandings and agreements.
      </Text>
      </ScrollView>
    </View>
  );
};

export default Terms;

const styles = StyleSheet.create({});
