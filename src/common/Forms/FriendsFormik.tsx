import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType, getUsersThunkCreator} from "../../store/reducers/friendsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store/redux-store";
import style from '../../components/friends/styles/Friends.module.css'
let UserSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}
type Friend = "true" | "false" | "null";

type FormType = {
    term: string
    friend: Friend
}
type UserSearchFormTypes = {}

let UserSearchForm: React.FC<UserSearchFormTypes> = React.memo(props => {

    const pageSize = useSelector((state: AppStateType) => state.friendPage.pageSize)
    const filter = useSelector((state: AppStateType) => state.friendPage.filter)


    const dispatch = useDispatch();

    const onFilterChanged = (currentPage: number, pageSize: number, filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter))
    }

    let submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {

        let filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }

        onFilterChanged(1, pageSize, filter)
        setSubmitting(false)
    }
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{term: filter.term, friend: String(filter.friend) as Friend}}
                validate={UserSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field className={style.searchField} type="text" name="term"/>
                        <button className={style.searchButton} type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
})

export default UserSearchForm;