import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { RenderFields } from '../../helpers/renderFields';
import M from 'materialize-css';
import { withRouter } from 'react-router-dom';
import { createEntity } from '../../actions/genericCrud';

const Create = ({ match: { params: urlParams }, history, entity: passedEntity }) => {
  const [entityFields, setEntityFields] = useState();
  const [entity] = useState(passedEntity || urlParams.entity);
  const [projectId] = useState(urlParams.projectId);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();
  const nextPath = urlParams.projectId ? `/project/${projectId}` : '/';

  const getEntity = async () => {
    setIsLoading(true);
    const res = await axios.get(`/api/${entity}/define`);
    setEntityFields(res.data);
    setIsLoading(false);
  }

  const onSubmit = async (values) => {
    try {
      console.log('values', values);
      setErrorMessage(null);
      setIsLoading(true);
      await axios.post(`/api/${entity}`, values);
      setIsLoading(false);
      history.push(nextPath);
    } catch (error) {
      setErrorMessage(error.response.data);
      setIsLoading(false);
    }
  }

  const validate = (validate) => {
    let errors = {};
    return errors;
  }

  useEffect(() => {
    getEntity();
    M.AutoInit();
  }, []);

  return (
    <React.Fragment>
      <h3 className="header">{`Crear ${entity}`}</h3>
      <Formik
        key="2"
        className="row"
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{ projectId }}
        render={
          ({ setFieldValue }) => (
            <Form className="col s12">
              <RenderFields entity={entity} fields={entityFields} setFieldValue={setFieldValue} />
              <button className="btn waves-effect waves-light right" type="submit" name="action">
                Submit
          <i className="material-icons right">send</i>
              </button>
              <button
                className="yellow darken-3 white-text btn-flat"
                onClick={() => history.push(nextPath)}
              >Back</button>
              {errorMessage && errorMessage.errors && <div>{errorMessage.errors[0].message}</div>}
            </Form>
          )
        }
      >
      </Formik >
      {isLoading && (<div class="progress">
        <div class="indeterminate"></div>
      </div>)}
    </React.Fragment>
  )
}

export default withRouter(Create);