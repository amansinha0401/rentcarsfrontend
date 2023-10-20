import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/bikesActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import AOS from "aos";

import "aos/dist/aos.css"; // You can also use <link> for styles
const { RangePicker } = DatePicker;
function BookingBike({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [guide, setguide] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  //Find car by id
  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id === match.params.carid));
    }
  }, [cars]);
  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (guide) {
      // If guide is required, add an additional charge
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [guide, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  }

  function bookCarNow() {
    const reqObj = {
      // Include your required data here
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      guideRequired: guide,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          <img
            src={car.image}
            className="carimg2 bs1 w-100"
            data-aos="flip-left"
            data-aos-duration="1500"
          />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            CAR Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per hour /-</p>
            <p>Type / Description: {car.fuelType}</p>
            <p> Weight : {car.capacity}</p>
          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setguide(true);
                  } else {
                    setguide(false);
                  }
                }}
              >
                Guide Required
              </Checkbox>

              <h3>Total Amount : {totalAmount}</h3>

              <button className="btn1" onClick={bookCarNow}>
                Book Now
              </button>
            </div>
          )}
        </Col>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot, index) => (
                <button className="btn1 mt-2" key={index}>
                  {slot.from} - {slot.to}
                </button>
              ))}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default BookingBike;
