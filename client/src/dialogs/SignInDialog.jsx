import React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  goEmailSignIn,
  goTwitterSignIn,
  goFacebookSignIn,
  goGoogleSignIn
} from '../app/routing'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import LoadingSpinner from '../ui/LoadingSpinner'
import Dialog from './Dialog'
import './SignInDialog.scss'

export default class SignInDialog extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      emailSent: false,
      sendingEmail: false,
      error: false,
      signingIn: false
    }

    this.emailInputEl = React.createRef()
  }

  componentDidMount = () => {}

  handleChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  handleFacebookSignIn = (event) => {
    event.preventDefault()

    this.setState({
      signingIn: true
    })

    goFacebookSignIn()
  }

  handleGoogleSignIn = (event) => {
    event.preventDefault()

    this.setState({
      signingIn: true
    })

    goGoogleSignIn()
  }

  handleTwitterSignIn = (event) => {
    event.preventDefault()

    this.setState({
      signingIn: true
    })

    goTwitterSignIn()
  }

  handleGoEmailSignIn = (error, res) => {
    if (error) {
      console.error(error)
      return
    }

    this.setState({
      sendingEmail: false,
      emailSent: true,
      // Reset error state
      error: false
    })
  }

  handleEmailResend = (event) => {
    event.preventDefault()

    this.setState({
      emailSent: false
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    // Note: we don't validate the input here;
    // we let HTML5 <input type="email" required /> do validation

    goEmailSignIn(this.state.email, this.handleGoEmailSignIn)

    this.setState({
      sendingEmail: true
    })
  }

  renderErrorMessage = () => {
    return (
      <p className="sign-in-error-message">
        <FormattedMessage
          id="dialogs.sign-in.email-invalid"
          defaultMessage="Oops! That didn’t look like a valid email address. Please try again."
        />
      </p>
    )
  }

  renderSignInWaiting = () => {
    return (
      <Dialog>
        {() => (
          <div className="sign-in-dialog">
            <header>
              <h1 className="sign-in-loading-message">
                <FormattedMessage
                  id="dialogs.sign-in.loading-message"
                  defaultMessage="Signing you in…"
                />
              </h1>
            </header>
            <div
              className="dialog-content sign-in-loading"
              aria-live="polite"
              aria-busy="true"
            >
              <LoadingSpinner />
            </div>
          </div>
        )}
      </Dialog>
    )
  }

  renderEmailSent = () => {
    return (
      <Dialog>
        {() => (
          <div className="sign-in-dialog">
            <header>
              <h1 className="sign-in-loading-message">
                <FormattedMessage
                  id="dialogs.sign-in.loading-message"
                  defaultMessage="Signing you in…"
                />
              </h1>
            </header>
            <div className="dialog-content sign-in-email-sent">
              <p>
                <FormattedMessage
                  id="dialogs.sign-in.sent-message-with-email"
                  defaultMessage="We’ve sent an email to {email}. Please follow the instructions there to continue signing in!"
                  values={{
                    email: (
                      <span className="sign-in-email">{this.state.email}</span>
                    )
                  }}
                />
              </p>
              <p className="sign-in-resend">
                <FormattedMessage
                  id="dialogs.sign-in.email-unreceived"
                  defaultMessage="Didn’t receive it?"
                />
                <br />
                <a onClick={this.handleEmailResend}>
                  <FormattedMessage
                    id="dialogs.sign-in.resend-email"
                    defaultMessage="Resend email"
                  />
                </a>
              </p>
            </div>
          </div>
        )}
      </Dialog>
    )
  }

  render () {
    const { sendingEmail, emailSent, signingIn } = this.state

    if (sendingEmail || signingIn) {
      return this.renderSignInWaiting()
    } else if (emailSent) {
      return this.renderEmailSent()
    }

    return (
      <Dialog>
        {(closeDialog) => (
          <div className="sign-in-dialog">
            <header>
              <h1>
                <FormattedMessage
                  id="dialogs.sign-in.heading"
                  defaultMessage="Sign in / Sign up"
                />
              </h1>
            </header>
            <div className="dialog-content">
              <p>
                <FormattedMessage
                  id="dialogs.sign-in.description"
                  defaultMessage="Save your first design or sign in to access your past designs."
                />
              </p>

              <Button
                tertiary={true}
                className="sign-in-button sign-in-social-button sign-in-google-button"
                onClick={this.handleGoogleSignIn}
              >
                <Icon icon="google" />
                <FormattedMessage
                  id="dialogs.sign-in.button.google"
                  defaultMessage="Continue with Google"
                />
              </Button>
            </div>

            <footer>
              <p className="sign-in-disclaimer">
                <FormattedMessage
                  id="dialogs.sign-in.tos"
                  defaultMessage="By clicking one of these buttons, I agree to the {tosLink} and {privacyLink}."
                  values={{
                    tosLink: (
                      <a href="/terms-of-service" target="_blank">
                        <FormattedMessage
                          id="dialogs.sign-in.tos-link-label"
                          defaultMessage="terms of service"
                        />
                      </a>
                    ),
                    privacyLink: (
                      <a href="/privacy-policy" target="_blank">
                        <FormattedMessage
                          id="dialogs.sign-in.privacy-link-label"
                          defaultMessage="privacy policy"
                        />
                      </a>
                    )
                  }}
                />
              </p>
            </footer>
          </div>
        )}
      </Dialog>
    )
  }
}
