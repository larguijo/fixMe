import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { renderFields } from '../../helpers/renderFields';
import M from 'materialize-css';
import { withRouter } from 'react-router-dom';
import { createEntity } from '../../actions/genericCrud';

const Create = ({ match: { params: urlParams }, history, entity: passedEntity }) => {
  const [entityFields, setEntityFields] = useState();
  const [entity] = useState(passedEntity || urlParams.entity);
  const [projectId] = useState(urlParams.projectId);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getEntity = async () => {
    setIsLoading(true);
    const res = await axios.get(`/api/${entity}/define`);
    setEntityFields(res.data);
    setIsLoading(false);
  }

  const onSubmit = async (values) => {
    try {
      console.log('values', values);
      await axios.post(`/api/${entity}`, values);
    } catch (error) {
      console.log(error);
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
      {isLoading && (<div class="progress">
        <div class="indeterminate"></div>
      </div>)}
      <Formik key="2" className="row" onSubmit={onSubmit} validate={validate} initialValues={{ projectId }} >
        <Form className="col s12">
          {renderFields(entity, entityFields)}
          <button className="btn waves-effect waves-light right" type="submit" name="action">
            Submit
          <i className="material-icons right">send</i>
          </button>
          <button
            className="yellow darken-3 white-text btn-flat"
            onClick={() => history.push('/')}
          >Back</button>
        </Form>
      </Formik >

    </React.Fragment>
  )
}

export default withRouter(Create);