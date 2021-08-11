import React, { Component } from 'react';
import { ReCaptcha } from 'react-recaptcha-v3';
import { IntegrationService } from '../../services/IntegrationService';

class ReCaptchaV3 extends Component {

  verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!  
    const data = {
      response: recaptchaToken
    };
    IntegrationService.verfiyReCaptchaResponse(data).then(res => {
      console.log(res)
    }).catch(err => console.log(err))
  }

  updateToken = () => {
    // you will get a new token in verifyCallback
    this.recaptcha.execute();
  }
  render() {
    return (
      <div>
        <ReCaptcha
            ref={ref => this.recaptcha = ref}
            sitekey="6Lfs9PMbAAAAAPTRFkXQSRf2yF-WCAr2W__ZzqHe"
            action='action_name'
            verifyCallback={this.verifyCallback}
        />
      </div>
    );
  };
};

export default ReCaptchaV3;