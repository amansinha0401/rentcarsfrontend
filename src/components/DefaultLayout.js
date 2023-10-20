import React from "react";
import { Menu, Dropdown, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

//Menu items and footer
function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item> 
        <a href="/userbookings">Bookings</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/admin">Admin</a>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        <li style={{ color: "BLUE" }}>Logout</li>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <div className="header bs1" style={{ height: "60px", backgroundColor: "black" }}>
        <Row gutter={15} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between" style={{ height: "100%" }}>
              <h1 style={{ margin: "auto 0" }}>
                <b>
                  <Link to="/" style={{ color: "BLUE" }}>
                    R E N T - C A R S
                  </Link>
                </b>
              </h1>

              <Dropdown overlay={menu} placement="bottomCenter">
                <Button>{user.username}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
      <div className="footer text-center">
        <hr />
      </div>
    </div>
  );
}

export default DefaultLayout;
