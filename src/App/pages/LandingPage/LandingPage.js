import React, { Component } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  ClickableTile
 } from 'carbon-components-react';
import Footer from '../InfoFooter/Footer';
import { Settings24, Login24, UserIdentification24, Logout24 } from '@carbon/icons-react';

class LandingPage extends Component {
  // Initialize the state
  state = {
    loading: true,
    session: false
  }

  componentDidMount() {
    //Use Session data
    // fetch('http://localhost:3006/api/v1.0/static/session')
    //Use static data
    fetch('http://localhost:3006/api/v1.0/session/active')
    .then(res => res.json())
    .then((data) => {
      this.setState({
        // data = {session: active} // is active
        // data = {session: inactive} // is nnot active
        session: (data.session == 'active') ? true : false,
        loading: false
       })
    })
    .catch(console.log)
  }

  render() {
    return (
      <div className="bx--grid landing-page">
        <div className="bx--row landing-page__banner">
          <div className="bx--col-lg-16">
            <Breadcrumb aria-label="Page navigation" noTrailingSlash>
              <BreadcrumbItem>
                <a href="http://developer.ice.ibmcloud.com/">Developer SDK</a>
              </BreadcrumbItem>
            </Breadcrumb>
            <h1 className="landing-page__heading">
              SAML application service provider
            </h1>
          </div>
        </div>
        <div className="bx--row landing-page__r2">
            <div className="bx--col-md-4 bx--col-lg-7">
              <p className="landing-page__p">
                Use this application to test SSO with IBM Security Verify.
                This sample app can be reused in your own applications or
                simply used for testing purposes. Try applying access policies
                to this application to see MFA in action, or play around with newly
                created attributes.
              </p>
              <h1 className="landing-page__gettingstarted">
                Getting started
              </h1>
              { this.state.session && !this.state.loading ? (
                  <>
                    <ClickableTile className="landing-page_primary" href="/profile">
                    View profile
                    <UserIdentification24 aria-label="Profile" />
                    </ClickableTile>
                    <ClickableTile className="landing-page_button1" href="/logout">
                      Logout
                      <Logout24 aria-label="Logout" />
                    </ClickableTile>
                  </>
                ) : (
                  <>
                    <ClickableTile className="landing-page_primary" clicked={false} href="/login">
                      Login
                      <Login24 aria-label="Login" />
                    </ClickableTile>
                  </>
                )
              }
              <ClickableTile className="landing-page_secondary" clicked={false} href="/setup">
                Setup
                <Settings24 aria-label="Settings" />
              </ClickableTile>
            </div>
        </div>
        <Footer text="Need help?" link="/" linktext="Visit the knowledge center" className="landing-page__r3" />
      </div>
    )
  }
}
export default LandingPage;