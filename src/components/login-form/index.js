import React from "react";
import PropTypes from "prop-types";
import { Platform } from "react-native";
import { Text, Form, Item, Label, Input, H1, Button, Icon } from "native-base";
import { Formik } from "formik";
import * as yup from "yup";

export const LoginForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ email: "lednhatkhanh@gmail.com", password: "Abc123@@" }}
    validationSchema={yup.object({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    })}
    onSubmit={onSubmit}
  >
    {({ values, handleSubmit, handleBlur, handleChange, errors, touched }) => (
      <Form
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          paddingHorizontal: 20,
        }}
      >
        <H1 style={{ alignSelf: "center" }}>Login</H1>
        <Item stackedLabel error={touched.email && !!errors.email}>
          <Label>{(touched.email && errors.email && `Email (${errors.email})`) || "Email"}</Label>
          <Input
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            textContentType={Platform.OS === "ios" ? "emailAddress" : undefined}
            keyboardType="email-address"
            autoComplete={Platform.OS === "android" ? "email" : undefined}
          />
        </Item>
        <Item style={{ marginTop: 20 }} stackedLabel error={touched.password && !!errors.password}>
          <Label>
            {(touched.password && errors.password && `Password (${errors.password})`) || "Password"}
          </Label>
          <Input
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            textContentType={Platform.OS === "ios" ? "password" : undefined}
            autoComplete={Platform.OS === "android" ? "password" : undefined}
            secureTextEntry
          />
        </Item>
        <Item style={{ marginTop: 40, borderBottomWidth: 0 }}>
          <Button onPress={handleSubmit}>
            <Icon name="key" />
            <Text>Login</Text>
          </Button>
        </Item>
      </Form>
    )}
  </Formik>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
