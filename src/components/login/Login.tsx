import React from "react";
import styles from './styles/Login.module.css'
import '../../generalFiles/general.css'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FormCreator} from "../../common/Forms/FormsControl";
import {maxLength, requiredField} from "../../utils/validator/validator";
import {connect} from "react-redux";
import {LoginThunkCreator, LogoutThunkCreator} from "../../store/reducers/authReducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../store/store/redux-store";

let Input = FormCreator("input")

let LoginForm:React.FC<InjectedFormProps<LoginFormValueType>> = ({handleSubmit, error}) => {

    let maxLengthCreator = maxLength(50)

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Field placeholder="Email" name='email' className={styles.formUserName} validate={[requiredField]}
                   component={Input}/>
            <div className={styles.passContainer}>
                <Field placeholder="Password" name='password' type="password"
                       validate={[requiredField, maxLengthCreator]} className={styles.formPassword} component={Input}/>
                <i className="far fa-eye"></i>
                {/*<i className="far fa-eye-slash"></i>*/}
            </div>
            <button type="submit" id={styles.loginButton}>Login</button>
            {
                error &&
                <div>
                    {error ? error : "Error"}
                </div>
            }
        </form>

    );
}
let ReduxLoginForm = reduxForm<LoginFormValueType>({
    form: 'login'
})(LoginForm)

type MapStatePropType = {
    isAuth: boolean
}

type MapDispatchPropType = {
    LoginThunkCreator: (email: string, password: string) => void
}
let mapStateToProps = (state: AppStateType): MapStatePropType => {
    return {
        isAuth: state.auth.isAuth,
    }
}

type LoginFormValueType = {
    email: string,
    password: string
}

let Login: React.FC<MapStatePropType & MapDispatchPropType> = (props) => {

    const onSubmit = (formData: LoginFormValueType) => {
        props.LoginThunkCreator(formData.email, formData.password)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Welcome</h1>
                <ReduxLoginForm {...props}  onSubmit={onSubmit}/>
            </div>
        </div>

    );
}

export default connect(mapStateToProps, {LoginThunkCreator, LogoutThunkCreator})(Login);
