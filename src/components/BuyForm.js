import React, { useEffect, useRef, useState } from 'react';
import {PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js';
import bg_card_under_player from '../images/bg_card_under_player.png';
import bg_card_under_player_bg from '../images/bg_card_under_player_bg.png';
// import back_icon from '../images/back_icon.svg';
import coins_img from '../images/coins.svg';
import dollar from '../images/lang/dollar.svg';
// import paypal from '../images/paypal.png';
// import gsap from 'gsap';
// import SearchBar from './searchBar';

function BuyForm({back_to_main}) {

  const formik_wrapper_Ref = useRef();
  // const tl_formik_wrapper = useRef();
  const [amount, setAmount] = useState(10000);

  useEffect(() => {
    // tl_formik_wrapper.current = gsap.timeline({ paused: true });
    // tl_formik_wrapper.current.to(formik_wrapper_Ref.current, {
    //   x: -50,
    //   autoAlpha: 0,
    //   ease: 'power3.inOut',
    // });
    // tl_formik_wrapper.current.to('.options_wrapper', {
    //   left: '50px',
    //   autoAlpha: 1,
    //   ease: 'power3.inOut',
    // });
    // tl_formik_wrapper.current.to('.paymentEl', {
    //   x: 0,
    //   opacity: 1,
    //   duration: 1,
    //   ease: 'power2.out',
    // });
  }, []);

  // const showAllOptions = () => {
  //   if (!formik_wrapper_Ref.current.classList.contains('active')) {
  //     formik_wrapper_Ref.current.classList.add('active');
  //     tl_formik_wrapper.current.timeScale(1).play();
  //   } else {
  //     formik_wrapper_Ref.current.classList.remove('active');
  //     tl_formik_wrapper.current.timeScale(2).reverse();
  //   }
  // };
  // const closeAllOptions = () => {
  //   formik_wrapper_Ref.current.classList.remove('active');
  //   tl_formik_wrapper.current.timeScale(2).reverse();
  // };

  // const payments = [
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  //   { name: 'Paypal', img: paypal },
  // ];
  const amountRef = useRef(amount);
  useEffect(() => {
    amountRef.current = amount;
  }, [amount]);


  return (
    <div className="buy_form_wrap">
      <div className="posr">
        <div className="bg_ball_top"></div>
        <div className="bg_ball_bottom"></div>
        <div className="middle_box">
          <div className="col p50">
            <div className="card">
              <img
                src={bg_card_under_player_bg}
                alt=""
                style={{ height: '102%', top: '28vh' }}
              />
              <img src={bg_card_under_player} alt="" />
            </div>
          </div>
          <div className="col p50">
            <div
                className="back_to_main"
                onClick={back_to_main}
            >
              <span></span>
              <span></span>
            </div>
            <div className="formik_wrapper" ref={formik_wrapper_Ref}>
                    <form>
                      <div>The coins you will get</div>
                      <div className="coins_value_wrap">
                        <div className="coins_value">{amount}</div>
                        <div className="coins">
                          <img src={coins_img} alt="" />
                        </div>
                      </div>
                      <input
                        type="range"
                        id="coins"
                        name="coins"
                        min="0"
                        max="50000"
                        step="10000"
                        value={amount}
                        onChange={(e)=> {
                          setAmount(e.target.value)
                        }}
                      />
                      <label htmlFor="money">The money you will pay</label>
                      <div className="money_wrap">
                        <input disabled className="inputField" value={amount/50}/>
                        <img className="dollar" src={dollar} alt=""/>
                      </div>

                      <PayPalScriptProvider
                        options={{
                          'client-id': process.env.REACT_APP_PAYPAL_ID,
                          vault: true,
                        }}
                      >
                        <PayPalButtons
                          createOrder={async (data, actions) => {
                            const res = await fetch(
                              process.env.REACT_APP_PAYMENT_SERVER +
                                'orders/create/' +
                                amountRef.current/50,
                              {
                                method: 'post',
                              }
                            );
                            const orderData = await res.json();
                            // console.log('orderData: ', orderData);
                            return orderData.id;
                          }}
                          onApprove={async (data, actions) => {
                            const res = await fetch(
                              process.env.REACT_APP_PAYMENT_SERVER +
                                'orders/' +
                                data.orderID +
                                '/capture/' +
                                'mail@mail.com',
                              {
                                method: 'post',
                              }
                            );
                            const orderData = await res.json();
                            var errorDetail =
                              Array.isArray(orderData.details) &&
                              orderData.details[0];
                            if (
                              errorDetail &&
                              errorDetail.issue === 'INSTRUMENT_DECLINED'
                            ) {
                              return actions.restart();
                            }
                            if (errorDetail) {
                              var msg =
                                'Sorry, your transaction could not be processed.';
                              if (errorDetail.description)
                                msg += '\n\n' + errorDetail.description;
                              if (orderData.debug_id)
                                msg += ' (' + orderData.debug_id + ')';
                              return alert(msg);
                            }
                            var transaction =
                              orderData.purchase_units[0].payments.captures[0];
                            alert(
                              'Transaction ' +
                                transaction.status +
                                ': ' +
                                transaction.id +
                                '\n\nSee console for all available details'
                            );
                          }}
                        />
                      </PayPalScriptProvider>
                    </form>
            </div>
            {/*<div className="options_wrapper">*/}
            {/*  <div className="back" onClick={closeAllOptions}>*/}
            {/*    <div className="back_icon">*/}
            {/*      <img src={back_icon} alt="" />*/}
            {/*    </div>*/}
            {/*    <div className="back_text">Back</div>*/}
            {/*  </div>*/}
            {/*  <SearchBar />*/}
            {/*  <div className="options">*/}
            {/*    <ul>*/}
            {/*      {payments.map((el, index) => (*/}
            {/*        <li key={index} className="paymentEl">*/}
            {/*          <div className="payment_wrap">*/}
            {/*            <div className="payment_img">*/}
            {/*              <img src={el.img} alt="" />*/}
            {/*            </div>*/}
            {/*            <div className="name">{el.name}</div>*/}
            {/*          </div>*/}
            {/*        </li>*/}
            {/*      ))}*/}
            {/*    </ul>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyForm;
