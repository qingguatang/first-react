import React, { Component } from "react";
import { Row, Col, Button, Tabs, Modal } from "antd";

import BaseInfo from "./components/BaseInfo";
var moment = require("moment");

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const dateFormat = "YYYY-MM-DD";
const confirm = Modal.confirm;

class FormPage extends Component {
  state = {
    time: "", //默认时间
    org: "001", //默认机构
    orgData: [
      {
        value: "001",
        text: "徽商银行总行"
      },
      {
        value: "002",
        text: "工商银行总行"
      }
    ]
  };
  componentDidMount() {
    const time = moment();
    this.setState({ time });
  }
  tabsCallback = key => {
    console.log(key);
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = this.refs.baseInfoForm.getForm();
    //执行表单校验
    form.validateFields();
    const errors = form.getFieldsError();
    let validateResult = true;
    //判断校验是否成功
    for (let key in errors) {
      if (errors[key]) {
        validateResult = false;
      }
    }
    if (!validateResult) {
      return;
    }
    const values = form.getFieldsValue();
    values["time"] = values["time"].format(dateFormat);
    //如果表单校验成功，则传递表单数据
    console.log("Received values of form: ", values);

    confirm({
      title: "确认提交数据么?",
      content: <div>{JSON.stringify(values, null, 2)}</div>,
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  cancel = e => {
    e.preventDefault();
    const form = this.refs.baseInfoForm.getForm();

    confirm({
      title: "确认取消么?",
      content: <div>确认会清空表单数据</div>,
      onOk() {
        form.resetFields(["number","amount"]);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  render() {
    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={12}>
            <Row>
              <ButtonGroup>
                <Button type="primary" onClick={this.handleSubmit}>
                  提交
                </Button>
                <Button
                  type="danger"
                  onClick={this.cancel}
                >
                  取消
                </Button>
              </ButtonGroup>
            </Row>
            <Row>
              <Tabs defaultActiveKey="base" onChange={this.tabsCallback}>
                <TabPane tab="基本信息" key="base">
                  <BaseInfo ref="baseInfoForm" {...this.state} />
                </TabPane>
                <TabPane tab="银行信息" key="bank">
                  待开发
                </TabPane>
              </Tabs>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FormPage;
