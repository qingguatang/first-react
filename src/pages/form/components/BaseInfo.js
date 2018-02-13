import React, { Component } from "react";
import { Row, Col, Form, Input, DatePicker, Select } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

class BaseInfo extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const currencySelector = getFieldDecorator("currency", {
      initialValue: "USD"
    })(
      <Select style={{ width: 80 }}>
        <Option value="USD">USD</Option>
        <Option value="CNY">CNY</Option>
      </Select>
    );

    return (
      <Form>
        <Row gutter={8}>
          <Col span="12">
            <FormItem {...formItemLayout} label="通知编号">
              {getFieldDecorator("number", {
                rules: [
                  {
                    required: true,
                    message: "请输入通知编号!"
                  }
                ]
              })(<Input placeholder="通知编号" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="名称">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "请输入名称!"
                  }
                ]
              })(<Input placeholder="名称" onFocus={(e)=>{
                this.props.force(true);
              }} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="信用证金额">
              {getFieldDecorator("amount", {
                rules: [
                  {
                    required: true,
                    message: "请输入信用证金额!"
                  }
                ]
              })(<Input addonBefore={currencySelector} type="text" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="处理机构">
              {getFieldDecorator("org", {
                rules: [
                  {
                    required: true,
                    message: "请选择处理机构!"
                  }
                ]
              })(
                <Select>
                  {this.props.orgData.map(d => (
                    <Option key={d.value}>{d.text}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="预通知时间">
              {getFieldDecorator("time", {
                rules: [
                  {
                    required: true,
                    message: "请选择预通知时间!"
                  }
                ]
              })(<DatePicker />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create({
  //初始化默认值
  mapPropsToFields: props => {
    return {
      time: Form.createFormField({
        value: props.time
      }),
      org: Form.createFormField({
        value: props.org
      })
    };
  }
})(BaseInfo);
