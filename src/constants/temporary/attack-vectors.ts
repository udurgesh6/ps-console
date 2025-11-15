import { AttackVector, FilterGroup } from "@/types";
import { availableDomains } from "./available-domains";
import { landingPages } from "./landing-pages";

export const dummyAttackVectors: AttackVector[] = [
  {
    id: "av-1",
    name: "AirBnb Discount Scam",
    description:
      "Phishing campaign offering fake 50% discount on Airbnb bookings to harvest payment credentials",
    category: "phishing",
    subCategory: "email",
    type: "click",
    tropicality: "custom",
    startDate: new Date("2024-01-15T00:00:00"),
    endDate: new Date("2024-02-15T23:59:59"),
    status: true,
    emailHtmlTemplate: `<div style="margin: 0; padding: 0; font-family: Helvetica, Arial, sans-serif">
  <table
    cellpadding="0"
    style="
      border-collapse: collapse;
      width: 100%;
      max-width: 580px;
      margin: auto;
      background-color: #ffffff;
    "
  >
    <tbody>
      <tr>
        <td>
          <div
            style="
              border: 1px solid #dddddd;
              border-radius: 12px;
              overflow: hidden;
            "
          >
            <table cellpadding="0" style="width: 100%; padding: 48px">
              <tbody>
                <tr>
                  <td align="center" style="padding-bottom: 32px">
                    <img
                      alt="Airbnb"
                      src="https://storage.googleapis.com/template_image_bucket/airbnb%20logo.png"
                      style="height: 32px; width: 32px; border: 0"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2
                      style="
                        font-size: 32px;
                        line-height: 40px;
                        text-align: center;
                        color: #222222;
                        margin: 0;
                        font-weight: 800;
                      "
                    >
                      Enjoy 50% Off an Airbnb Stay!
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px">
                    <p
                      style="
                        font-size: 18px;
                        line-height: 28px;
                        text-align: center;
                        color: #555555;
                        margin: 0;
                      "
                    >
                      You’ve got places to go, and we’ve got places to stay!
                      Book your Airbnb listing by
                      <strong>%Future_date%</strong> and get 50% off your
                      booking fee. Maximum coupon value of $35.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 24px; text-align: center">
                    <a
                      href="%LandingPageURL%"
                      style="
                        font-size: 18px;
                        line-height: 24px;
                        color: #ffffff;
                        background-color: #222222;
                        padding: 16px 24px;
                        border-radius: 8px;
                        text-decoration: none;
                        display: inline-block;
                      "
                    >
                      Claim Now
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              cellpadding="0"
              style="
                width: 100%;
                background-color: #f9f9f9;
                padding: 24px;
                font-size: 12px;
                line-height: 16px;
                color: #717171;
              "
            >
              <tbody>
                <tr>
                  <td>
                    *This one-time-use coupon expires on
                    <strong>%Future_date%</strong> and is automatically applied
                    to your Airbnb account. Travel must begin before
                    <strong>%Future_date%</strong>. Maximum coupon value is $35.
                    This coupon is valid for stay reservations only and cannot
                    be transferred, exchanged for cash, or combined with another
                    offer. If you cancel a reservation made with the coupon, any
                    refund will exclude the coupon value. Airbnb reserves the
                    right to take corrective action if fraudulent activity is
                    suspected.
                  </td>
                </tr>
              </tbody>
            </table>
            <table cellpadding="0" style="width: 100%; padding: 24px">
              <tbody>
                <tr>
                  <td align="center" style="font-size: 14px; color: #222222">
                    Airbnb, Inc.<br />
                    888 Brannan St.<br />
                    San Francisco, CA 94103
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px">
                    <a href="%LandingPageURL%" style="margin-right: 12px"
                      ><img
                        src="https://storage.googleapis.com/template_image_bucket/facebook%20black%20logo.png"
                        alt="Facebook"
                        style="height: 20px; width: 20px; border: 0"
                    /></a>
                    <a href="%LandingPageURL%" style="margin-right: 12px"
                      ><img
                        src="https://storage.googleapis.com/template_image_bucket/insta%20white.png"
                        alt="Instagram"
                        style="height: 20px; width: 20px; border: 0"
                    /></a>
                    <a href="%LandingPageURL%"
                      ><img
                        src="https://storage.googleapis.com/template_image_bucket/twitter%20white.png"
                        alt="Twitter"
                        style="height: 20px; width: 20px; border: 0"
                    /></a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px">
                    <a href="%LandingPageURL%">
                      <img
                        src="https://storage.googleapis.com/template_image_bucket/download%20on%20the%20app%20store.png"
                        alt="App Store"
                        style="height: 40px; width: auto; border: 0"
                      />
                    </a>
                    <a href="%LandingPageURL%">
                      <img
                        src="https://storage.googleapis.com/template_image_bucket/get%20it%20on%20google%20play.png"
                        alt="Google Play"
                        style="height: 40px; width: auto; border: 0"
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`,
    emailSubject: "🏠 Limited Time: 50% Off Your Next Airbnb Stay!",
    from: `phish-sheriff@${availableDomains[0]}`,
    landingPages: [landingPages[0]],
    courses: [],
  },
  {
    id: "av-2",
    name: "Zoho 2FA Bypass Attempt",
    description:
      "Social engineering attack attempting to bypass two-factor authentication through fake Zoho security alerts",
    category: "social-engineering",
    subCategory: "pretexting",
    type: "click",
    tropicality: "custom",
    startDate: new Date("2024-02-01T00:00:00"),
    endDate: new Date("2024-03-01T23:59:59"),
    status: true,
    emailHtmlTemplate: `<html>
  <head>
    <meta charset="utf-8" />
    <title>Template Preview</title>
    <link href="/img/favicon.png" type="image/png" rel="icon" />
    <link href="/img/favicon.png" type="image/png" rel="shortcut icon" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i|Roboto+Slab:700&amp;display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <table
      style="
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        vertical-align: top;
        min-width: 320px;
        margin: 0 auto;
        background-color: #ffffff;
        width: 100%;
      "
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td style="border-collapse: collapse; vertical-align: top">
            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 900px;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    background-color: transparent;
                  "
                >
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 900px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="width: 100%">
                      <div
                        style="
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 0px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div>
                                  <div>
                                    <div style="margin: 0; padding: 0">
                                      <table
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <table
                                                align="center"
                                                style="
                                                  border-collapse: collapse;
                                                  max-width: 700px;
                                                  min-width: 320px;
                                                  width: 100%;
                                                "
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        padding: 2% 2% 2% 2%;
                                                      "
                                                      align="left"
                                                    >
                                                      <table
                                                        width="100%"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td>
                                                              <table
                                                                width="100%"
                                                                cellspacing="0"
                                                                cellpadding="0"
                                                                border="0"
                                                              >
                                                                <tbody>
                                                                  <tr>
                                                                    <td>
                                                                      <a
                                                                        style="
                                                                          display: inline-block;
                                                                        "
                                                                        href="%LandingPageURL%"
                                                                        ><img
                                                                          style="
                                                                            display: block;
                                                                            height: 30px;
                                                                            width: 80px;
                                                                          "
                                                                          src="https://storage.googleapis.com/template_image_bucket/zoho%20logo.png"
                                                                          alt=""
                                                                      /></a>
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        padding: 20px
                                                                          0 0 0;
                                                                        font-size: 24px;
                                                                        line-height: 48px;
                                                                        font-family: 'Open Sans',
                                                                          'Trebuchet MS',
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      <b
                                                                        ><a
                                                                          style="
                                                                            text-decoration: none;
                                                                            color: #222;
                                                                          "
                                                                          href="%LandingPageURL%"
                                                                          >Hi
                                                                          %Username%,&nbsp;</a
                                                                        ></b
                                                                      >
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        padding: 20px
                                                                          0 0 0;
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        font-family: 'Open Sans',
                                                                          'Trebuchet MS',
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      There's
                                                                      been a new
                                                                      sign-in to
                                                                      your
                                                                      <span
                                                                        >Zoho</span
                                                                      >
                                                                      account
                                                                      associated
                                                                      with the
                                                                      email
                                                                      address
                                                                      <b
                                                                        ><a
                                                                          href="%LandingPageURL%"
                                                                          style="
                                                                            color: #15c;
                                                                          "
                                                                          >%Company_email%</a
                                                                        ></b
                                                                      >
                                                                      on
                                                                      %Current_time%
                                                                      09:38:43
                                                                      AM CEST.
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        padding: 10px
                                                                          0 0 0;
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        font-family: 'Open Sans',
                                                                          'Trebuchet MS',
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      <b
                                                                        style="
                                                                          width: 80px;
                                                                          display: inline-table;
                                                                        "
                                                                        >Device</b
                                                                      >
                                                                      iPhone
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        padding: 10px
                                                                          0 0 0;
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        font-family: 'Open Sans',
                                                                          'Trebuchet MS',
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      <b
                                                                        style="
                                                                          width: 80px;
                                                                          display: inline-table;
                                                                        "
                                                                        >Browser</b
                                                                      >
                                                                      Mobile
                                                                      Safari
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        padding: 10px
                                                                          0 0 0;
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        font-family: 'Open Sans',
                                                                          'Trebuchet MS',
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      <b
                                                                        style="
                                                                          width: 80px;
                                                                          display: inline-table;
                                                                        "
                                                                        >Location</b
                                                                      >
                                                                      %Department%,
                                                                      %Current_month%
                                                                      <br />
                                                                      <span
                                                                        style="
                                                                          color: #666;
                                                                          font-size: 12px;
                                                                          display: inline-block;
                                                                        "
                                                                        >(Location
                                                                        is
                                                                        approximated
                                                                        based on
                                                                        IP
                                                                        Address:
                                                                        <b
                                                                          >84.22.53.110</b
                                                                        >)</span
                                                                      >
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        padding: 20px
                                                                          0 0 0;
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        font-family: 'Open Sans',
                                                                          'Trebuchet MS',
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      If this
                                                                      wasn't
                                                                      you, you
                                                                      need to
                                                                      <a
                                                                        style="
                                                                          color: #0091ff;
                                                                          text-decoration: none;
                                                                        "
                                                                        href="%LandingPageURL%"
                                                                        >change
                                                                        your
                                                                        <span
                                                                          >Zoho</span
                                                                        >
                                                                        account
                                                                        password</a
                                                                      >
                                                                      to protect
                                                                      your
                                                                      account.
                                                                    </td>
                                                                  </tr>

                                                                  <!-- Security CTA Button -->
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        padding: 25px
                                                                          0;
                                                                        text-align: center;
                                                                      "
                                                                    >
                                                                      <a
                                                                        href="%LandingPageURL%"
                                                                        style="
                                                                          display: inline-block;
                                                                          background-color: #d73502;
                                                                          color: #ffffff;
                                                                          text-decoration: none;
                                                                          padding: 14px
                                                                            28px;
                                                                          border-radius: 4px;
                                                                          font-size: 16px;
                                                                          font-weight: bold;
                                                                          font-family: 'Open Sans',
                                                                            'Trebuchet MS',
                                                                            sans-serif;
                                                                          text-align: center;
                                                                          border: none;
                                                                          cursor: pointer;
                                                                          box-shadow: 0
                                                                            2px
                                                                            4px
                                                                            rgba(
                                                                              0,
                                                                              0,
                                                                              0,
                                                                              0.2
                                                                            );
                                                                        "
                                                                        >Secure
                                                                        My
                                                                        Account</a
                                                                      >
                                                                    </td>
                                                                  </tr>

                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        font-family: 'Open Sans',
                                                                          'Trebuchet MS',
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      Please
                                                                      contact
                                                                      <a
                                                                        style="
                                                                          color: #0091ff;
                                                                          text-decoration: none;
                                                                        "
                                                                        href="%LandingPageURL%"
                                                                        ><span
                                                                          >Zoho</span
                                                                        >
                                                                        support</a
                                                                      >
                                                                      for any
                                                                      assistance.
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        padding: 20px
                                                                          0 0 0;
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        font-family: 'Open Sans',
                                                                          'Trebuchet MS',
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      Learn more
                                                                      on
                                                                      <a
                                                                        style="
                                                                          color: #0091ff;
                                                                          text-decoration: none;
                                                                        "
                                                                        href="%LandingPageURL%"
                                                                        >ways to
                                                                        protect
                                                                        your
                                                                        <span
                                                                          >Zoho</span
                                                                        >
                                                                        account
                                                                        here</a
                                                                      >.
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        padding: 20px
                                                                          0 0 0;
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        font-family: 'Open Sans',
                                                                          'Trebuchet MS',
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      Regards,<br />
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        font-family: 'Open Sans',
                                                                          'Trebuchet MS',
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      <b
                                                                        ><span
                                                                          >Zoho</span
                                                                        >
                                                                        Team</b
                                                                      ><br />
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        font-family: 'Open Sans',
                                                                          'Trebuchet MS',
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      <a
                                                                        style="
                                                                          color: #0091ff;
                                                                          text-decoration: none;
                                                                        "
                                                                        href="%LandingPageURL%"
                                                                        >www.<span>zoho</span>.com</a
                                                                      >
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        border-bottom: 3px
                                                                          solid
                                                                          #339e72;
                                                                      "
                                                                    >
                                                                      <img
                                                                        style="
                                                                          display: block;
                                                                          width: 100%;
                                                                          height: auto;
                                                                        "
                                                                        src="https://storage.googleapis.com/template_image_bucket/abstract.jpg"
                                                                        alt=""
                                                                      />
                                                                      <div
                                                                        style="
                                                                          opacity: 0.01;
                                                                          left: 638px;
                                                                          top: 623.5px;
                                                                        "
                                                                        dir="ltr"
                                                                      >
                                                                        <div>
                                                                          <div>
                                                                            <div></div>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <table>
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              style="
                                                                padding: 10px 0
                                                                  10px 0;
                                                                font-size: 12px;
                                                                color: #333333;
                                                                line-height: 22px;
                                                                font-family: 'Open Sans',
                                                                  'Trebuchet MS',
                                                                  sans-serif;
                                                              "
                                                            >
                                                              <span>Zoho</span>
                                                              Corporation,
                                                              Beneluxlaan 4B,
                                                              3527 HT UTRECHT,
                                                              The
                                                              Netherlands.<br />Phone:
                                                              +31 85 066 6700<br />This
                                                              e-mail is
                                                              generated from
                                                              <span>Zoho</span>
                                                              Accounts. If you
                                                              think this is
                                                              SPAM, please
                                                              report to
                                                              <a
                                                                style="
                                                                  color: #0091ff;
                                                                  text-decoration: none;
                                                                "
                                                                href="%LandingPageURL%"
                                                                >abuse@eu.zohocorp.com</a
                                                              >
                                                              for immediate
                                                              action.
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div></div>
                                      <div></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        margin: 0;
      }

      .popper {
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid #ff8300;
        width: 200px;
        padding: 12px;
        border-radius: 4px;
        -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        -moz-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        font-size: 14px;
        font-weight: normal;
        margin-top: 6px;
        cursor: pointer;
        line-height: 1.5em;
      }

      .popper .arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 6px;
      }

      .popper[x-placement^="top"] {
        margin-bottom: 6px;
      }

      .popper[x-placement^="top"] .popper__arrow {
        border-width: 6px 6px 0 6px;
        border-color: #ff8300 transparent transparent transparent;
        bottom: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="bottom"] {
        margin-top: 6px;
      }

      .popper[x-placement^="bottom"] .popper__arrow {
        border-width: 0 6px 6px 6px;
        border-color: transparent transparent #ff8300 transparent;
        top: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="right"] {
        margin-left: 6px;
      }

      .popper[x-placement^="right"] .popper__arrow {
        border-width: 6px 6px 6px 0;
        border-color: transparent #ff8300 transparent transparent;
        left: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }

      .popper[x-placement^="left"] {
        margin-right: 6px;
      }

      .popper[x-placement^="left"] .popper__arrow {
        border-width: 6px 0 6px 6px;
        border-color: transparent transparent transparent #ff8300;
        right: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }
    </style>

    <script src="/js/dist/common.js"></script>
    <script>
      var showPoppers = true;
    </script>
    <script src="/js/dist/templatePreview.js"></script>
  </body>
</html>
`,
    emailSubject: "Zoho Security Alert: Verify Your Account",
    from: `phish-sheriff@${availableDomains[0]}`,
    landingPages: [landingPages[1]],
    courses: [],
  },
  {
    id: "av-3",
    name: "YouTube Premium Fake Subscription",
    description:
      "Malicious campaign offering fake YouTube Premium trial to collect payment information",
    category: "credential-harvesting",
    subCategory: "fake-login",
    type: "submission",
    tropicality: "custom",
    startDate: new Date("2024-03-01T00:00:00"),
    endDate: new Date("2024-04-01T23:59:59"),
    status: true,
    emailHtmlTemplate: `<html>
  <head>
    <meta charset="utf-8" />
    <title>Template Preview</title>
    <link href="/img/favicon.png" type="image/png" rel="icon" />
    <link href="/img/favicon.png" type="image/png" rel="shortcut icon" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i|Roboto+Slab:700&amp;display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <table
      style="
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        vertical-align: top;
        min-width: 320px;
        margin: 0 auto;
        background-color: #efefef;
        width: 100%;
      "
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td style="border-collapse: collapse; vertical-align: top">
            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 700px;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 700px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100%">
                      <div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 10px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div>
                                  <div style="background-color: #ffffff">
                                    <span
                                      style="display: none; width: 0; height: 0"
                                    >
                                    </span>
                                    <table
                                      align="center"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="680"
                                    >
                                      <tbody>
                                        <tr>
                                          <td width="40"></td>
                                          <td width="600">
                                            <table
                                              align="center"
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="600"
                                              style="background-color: #ffffff"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    <table
                                                      align="left"
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      width="600"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td width="584">
                                                            <a
                                                              href="%LandingPageURL%"
                                                            >
                                                              <img
                                                                alt="Youtube Logo"
                                                                border="0"
                                                                src="https://storage.googleapis.com/template_image_bucket/youtube%20premium.png"
                                                                style="
                                                                  width: 300px;
                                                                  padding-top: 20px;
                                                                "
                                                              />
                                                            </a>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    style="
                                                      max-height: 0px;
                                                      font-size: 0;
                                                      display: none;
                                                    "
                                                  >
                                                    <hr
                                                      style="
                                                        height: 0px;
                                                        border: none;
                                                        border-color: transparent;
                                                        padding: 0px;
                                                        margin: 0px;
                                                      "
                                                      width="600"
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td height="20"></td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <table
                                                      align="center"
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      width="600"
                                                      style="
                                                        border-top: 1px solid
                                                          #e0e0e0;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td>
                                                            <table
                                                              align="center"
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              width="600"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td></td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    <table
                                                                      border="0"
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      style="
                                                                        table-layout: fixed;
                                                                      "
                                                                      width="560"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td>
                                                                            <table
                                                                              border="0"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              style="
                                                                                table-layout: fixed;
                                                                              "
                                                                              width="540"
                                                                            >
                                                                              <tbody>
                                                                                <tr>
                                                                                  <td>
                                                                                    <table
                                                                                      style="
                                                                                        width: 100%;
                                                                                        background-color: #f9f9f9;
                                                                                        border-spacing: 0;
                                                                                        margin: 0
                                                                                          auto;
                                                                                      "
                                                                                    >
                                                                                      <tbody>
                                                                                        <tr>
                                                                                          <td
                                                                                            style="
                                                                                              padding: 20px;
                                                                                              text-align: center;
                                                                                              background-color: #ffffff;
                                                                                            "
                                                                                          >
                                                                                            <h1
                                                                                              style="
                                                                                                font-size: 24px;
                                                                                                color: #000000;
                                                                                                margin: 0;
                                                                                              "
                                                                                            >
                                                                                              Welcome
                                                                                              to
                                                                                              YouTube
                                                                                              Premium:
                                                                                              Your
                                                                                              Subscription
                                                                                              is
                                                                                              Active!
                                                                                            </h1>
                                                                                          </td>
                                                                                        </tr>
                                                                                      </tbody>
                                                                                    </table>

                                                                                    <table
                                                                                      style="
                                                                                        width: 100%;
                                                                                        background-color: #ffffff;
                                                                                        border-spacing: 0;
                                                                                        margin: 0
                                                                                          auto;
                                                                                      "
                                                                                    >
                                                                                      <tbody>
                                                                                        <tr>
                                                                                          <td
                                                                                            style="
                                                                                              padding: 20px;
                                                                                              color: #333333;
                                                                                              padding-top: 10px;
                                                                                            "
                                                                                          >
                                                                                            <p>
                                                                                              Hi
                                                                                              %Username%,
                                                                                            </p>
                                                                                            <p>
                                                                                              Thank
                                                                                              you
                                                                                              for
                                                                                              subscribing
                                                                                              to
                                                                                              <strong
                                                                                                >YouTube
                                                                                                Premium</strong
                                                                                              >!
                                                                                              We're
                                                                                              excited
                                                                                              to
                                                                                              bring
                                                                                              you
                                                                                              an
                                                                                              enhanced
                                                                                              YouTube
                                                                                              experience.
                                                                                              Your
                                                                                              subscription
                                                                                              is
                                                                                              now
                                                                                              active,
                                                                                              and
                                                                                              you
                                                                                              can
                                                                                              start
                                                                                              enjoying
                                                                                              all
                                                                                              the
                                                                                              benefits
                                                                                              right
                                                                                              away.
                                                                                            </p>

                                                                                            <h2
                                                                                              style="
                                                                                                font-size: 20px;
                                                                                                color: rgb(
                                                                                                  204,
                                                                                                  0,
                                                                                                  0
                                                                                                );
                                                                                              "
                                                                                            >
                                                                                              What's
                                                                                              included
                                                                                              in
                                                                                              your
                                                                                              YouTube
                                                                                              Premium
                                                                                              subscription:
                                                                                            </h2>
                                                                                            <ul
                                                                                              style="
                                                                                                padding-left: 20px;
                                                                                              "
                                                                                            >
                                                                                              <li>
                                                                                                Ad-Free
                                                                                                Viewing:
                                                                                                Enjoy
                                                                                                all
                                                                                                your
                                                                                                favorite
                                                                                                videos
                                                                                                without
                                                                                                interruptions.
                                                                                              </li>
                                                                                              <li>
                                                                                                Offline
                                                                                                Playback:
                                                                                                Download
                                                                                                videos
                                                                                                to
                                                                                                watch
                                                                                                anytime,
                                                                                                anywhere,
                                                                                                even
                                                                                                without
                                                                                                an
                                                                                                internet
                                                                                                connection.
                                                                                              </li>
                                                                                              <li>
                                                                                                Background
                                                                                                Play:
                                                                                                Continue
                                                                                                watching
                                                                                                videos
                                                                                                while
                                                                                                using
                                                                                                other
                                                                                                apps
                                                                                                or
                                                                                                when
                                                                                                your
                                                                                                screen
                                                                                                is
                                                                                                off.
                                                                                              </li>
                                                                                              <li>
                                                                                                YouTube
                                                                                                Music
                                                                                                Premium:
                                                                                                Stream
                                                                                                millions
                                                                                                of
                                                                                                songs
                                                                                                ad-free,
                                                                                                download
                                                                                                music
                                                                                                for
                                                                                                offline
                                                                                                listening,
                                                                                                and
                                                                                                more.
                                                                                              </li>
                                                                                            </ul>

                                                                                            <!-- CTA Button -->
                                                                                            <div
                                                                                              style="
                                                                                                text-align: center;
                                                                                                margin: 30px
                                                                                                  0;
                                                                                              "
                                                                                            >
                                                                                              <a
                                                                                                href="%LandingPageURL%"
                                                                                                style="
                                                                                                  display: inline-block;
                                                                                                  background-color: #cc0000;
                                                                                                  color: #ffffff;
                                                                                                  text-decoration: none;
                                                                                                  padding: 16px
                                                                                                    32px;
                                                                                                  border-radius: 4px;
                                                                                                  font-size: 16px;
                                                                                                  font-weight: bold;
                                                                                                  font-family: Arial,
                                                                                                    sans-serif;
                                                                                                  text-align: center;
                                                                                                  border: none;
                                                                                                  cursor: pointer;
                                                                                                  box-shadow: 0
                                                                                                    2px
                                                                                                    4px
                                                                                                    rgba(
                                                                                                      0,
                                                                                                      0,
                                                                                                      0,
                                                                                                      0.2
                                                                                                    );
                                                                                                "
                                                                                                >Start
                                                                                                Your
                                                                                                Premium
                                                                                                Experience</a
                                                                                              >
                                                                                            </div>

                                                                                            <h2
                                                                                              style="
                                                                                                font-size: 20px;
                                                                                                color: rgb(
                                                                                                  204,
                                                                                                  0,
                                                                                                  0
                                                                                                );
                                                                                              "
                                                                                            >
                                                                                              Billing
                                                                                              Details:
                                                                                            </h2>
                                                                                            <p>
                                                                                              <strong
                                                                                                >Subscription
                                                                                                Plan:</strong
                                                                                              >
                                                                                              Individual
                                                                                              Plan<br />
                                                                                              <strong
                                                                                                >Billing
                                                                                                Cycle:</strong
                                                                                              >
                                                                                              Monthly
                                                                                              <br />
                                                                                              <strong
                                                                                                >Amount
                                                                                                Charged:</strong
                                                                                              >
                                                                                              $13.99&ZeroWidthSpace;<br />
                                                                                              <strong
                                                                                                >Next
                                                                                                Billing
                                                                                                Date:</strong
                                                                                              >
                                                                                              %Current_time%
                                                                                            </p>
                                                                                            <p>
                                                                                              If
                                                                                              you're
                                                                                              currently
                                                                                              on
                                                                                              a
                                                                                              free
                                                                                              trial,
                                                                                              your
                                                                                              first
                                                                                              payment
                                                                                              will
                                                                                              be
                                                                                              charged
                                                                                              on
                                                                                              %Current_time%.
                                                                                            </p>

                                                                                            <h2
                                                                                              style="
                                                                                                font-size: 20px;
                                                                                                color: rgb(
                                                                                                  204,
                                                                                                  0,
                                                                                                  0
                                                                                                );
                                                                                              "
                                                                                            >
                                                                                              Manage
                                                                                              Your
                                                                                              Subscription:
                                                                                            </h2>
                                                                                            <p>
                                                                                              Need
                                                                                              to
                                                                                              update
                                                                                              your
                                                                                              plan
                                                                                              or
                                                                                              cancel
                                                                                              your
                                                                                              subscription?
                                                                                              You
                                                                                              can
                                                                                              easily
                                                                                              manage
                                                                                              your
                                                                                              settings
                                                                                              by
                                                                                              visiting
                                                                                              your
                                                                                              <a
                                                                                                href="%LandingPageURL%"
                                                                                                style="
                                                                                                  color: rgb(
                                                                                                    204,
                                                                                                    0,
                                                                                                    0
                                                                                                  );
                                                                                                  text-decoration: none;
                                                                                                "
                                                                                                ><b
                                                                                                  >Account
                                                                                                  Settings</b
                                                                                                ></a
                                                                                              >.
                                                                                            </p>

                                                                                            <h2
                                                                                              style="
                                                                                                font-size: 20px;
                                                                                                color: rgb(
                                                                                                  204,
                                                                                                  0,
                                                                                                  0
                                                                                                );
                                                                                              "
                                                                                            >
                                                                                              Need
                                                                                              Help?
                                                                                            </h2>
                                                                                            <p>
                                                                                              If
                                                                                              you
                                                                                              have
                                                                                              any
                                                                                              questions
                                                                                              or
                                                                                              need
                                                                                              assistance,
                                                                                              please
                                                                                              visit
                                                                                              our
                                                                                              <a
                                                                                                href="%LandingPageURL%"
                                                                                                style="
                                                                                                  color: rgb(
                                                                                                    204,
                                                                                                    0,
                                                                                                    0
                                                                                                  );
                                                                                                  text-decoration: none;
                                                                                                "
                                                                                                ><b
                                                                                                  >Support
                                                                                                  Center</b
                                                                                                ></a
                                                                                              >
                                                                                              or
                                                                                              check
                                                                                              out
                                                                                              our
                                                                                              <a
                                                                                                href="%LandingPageURL%"
                                                                                                style="
                                                                                                  color: rgb(
                                                                                                    204,
                                                                                                    0,
                                                                                                    0
                                                                                                  );
                                                                                                  text-decoration: none;
                                                                                                "
                                                                                                ><b
                                                                                                  >FAQs</b
                                                                                                ></a
                                                                                              >.
                                                                                            </p>

                                                                                            <p>
                                                                                              Thank
                                                                                              you
                                                                                              for
                                                                                              choosing
                                                                                              YouTube
                                                                                              Premium.
                                                                                              Enjoy
                                                                                              your
                                                                                              ad-free
                                                                                              experience
                                                                                              and
                                                                                              all
                                                                                              the
                                                                                              other
                                                                                              great
                                                                                              features
                                                                                              we
                                                                                              offer!
                                                                                            </p>

                                                                                            <p>
                                                                                              Best
                                                                                              regards,<br />The
                                                                                              YouTube
                                                                                              Premium
                                                                                              Team
                                                                                            </p>
                                                                                          </td>
                                                                                        </tr>
                                                                                      </tbody>
                                                                                    </table>
                                                                                  </td>
                                                                                </tr>
                                                                              </tbody>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    <table
                                                                      border="0"
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      style="
                                                                        height: 16px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            height="16"
                                                                          ></td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <hr
                                                      style="
                                                        display: block;
                                                        height: 1px;
                                                        border: 0;
                                                        border-top: 1px solid
                                                          #eaeaea;
                                                        margin-bottom: 16px;
                                                        padding: 0;
                                                      "
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            style="
                                                              color: #757575;
                                                              font-size: 12px;
                                                              line-height: 16px;
                                                              font-family: Roboto,
                                                                sans-serif;
                                                              letter-spacing: 0px;
                                                            "
                                                          >
                                                            You received this
                                                            email because you
                                                            have subsribed to
                                                            Youtube Premium.
                                                            <a
                                                              href="%LandingPageURL%"
                                                              style="
                                                                color: #15c;
                                                              "
                                                            >
                                                              Learn more</a
                                                            >.
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>
                                                            <table
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              style="
                                                                height: 16px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    height="16"
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="
                                                              color: #757575;
                                                              font-size: 12px;
                                                              line-height: 16px;
                                                              font-family: Roboto,
                                                                sans-serif;
                                                              letter-spacing: 0px;
                                                              text-decoration: none;
                                                            "
                                                          >
                                                            © 2024 YouTube, LLC
                                                            901
                                                            <a
                                                              href="%LandingPageURL%"
                                                              style="
                                                                color: #15c;
                                                              "
                                                            >
                                                              Cherry Ave, San
                                                              Bruno, CA 94066
                                                            </a>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>
                                                            <table
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              style="
                                                                height: 16px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    height="16"
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                          <td width="40"></td>
                                        </tr>
                                        <tr>
                                          <td colspan="3">
                                            <table
                                              align="left"
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              style="
                                                height: 18px;
                                                background-repeat: no-repeat;
                                              "
                                              width="600"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td width="40"></td>
                                                  <td width="20">
                                                    <a href="%LandingPageURL%">
                                                      <img
                                                        alt="YouTube"
                                                        border="0"
                                                        height="18"
                                                        src="https://storage.googleapis.com/template_image_bucket/youtube%20grey%20hollow.png"
                                                      />
                                                    </a>
                                                  </td>
                                                  <td width="16"></td>
                                                  <td>
                                                    <a href="%LandingPageURL%">
                                                      <img
                                                        alt="Twitter"
                                                        border="0"
                                                        height="18"
                                                        src="https://storage.googleapis.com/template_image_bucket/twitter%20grey%20solid.png"
                                                      />
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        margin: 0;
      }

      .popper {
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid #ff8300;
        width: 200px;
        padding: 12px;
        border-radius: 4px;
        -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        -moz-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        font-size: 14px;
        font-weight: normal;
        margin-top: 6px;
        cursor: pointer;
        line-height: 1.5em;
      }

      .popper .arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 6px;
      }

      .popper[x-placement^="top"] {
        margin-bottom: 6px;
      }

      .popper[x-placement^="top"] .popper__arrow {
        border-width: 6px 6px 0 6px;
        border-color: #ff8300 transparent transparent transparent;
        bottom: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="bottom"] {
        margin-top: 6px;
      }

      .popper[x-placement^="bottom"] .popper__arrow {
        border-width: 0 6px 6px 6px;
        border-color: transparent transparent #ff8300 transparent;
        top: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="right"] {
        margin-left: 6px;
      }

      .popper[x-placement^="right"] .popper__arrow {
        border-width: 6px 6px 6px 0;
        border-color: transparent #ff8300 transparent transparent;
        left: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }

      .popper[x-placement^="left"] {
        margin-right: 6px;
      }

      .popper[x-placement^="left"] .popper__arrow {
        border-width: 6px 0 6px 6px;
        border-color: transparent transparent transparent #ff8300;
        right: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }
    </style>

    <script src="/js/dist/common.js"></script>
    <script>
      var showPoppers = true;
    </script>
    <script src="/js/dist/templatePreview.js"></script>
  </body>
</html>
`,
    emailSubject: "🎥 Claim Your Free YouTube Premium Trial",
    from: `phish-sheriff@${availableDomains[0]}`,
    landingPages: [landingPages[2]],
    courses: [],
  },
  {
    id: "av-4",
    name: "Uber Welcome Account Takeover",
    description:
      "Account takeover attempt targeting new Uber users with fake welcome emails",
    category: "phishing",
    subCategory: "email",
    type: "click",
    tropicality: "custom",
    startDate: new Date("2024-04-01T00:00:00"),
    endDate: new Date("2024-05-01T23:59:59"),
    status: true,
    emailHtmlTemplate: `<html>
  <head>
    <meta charset="utf-8" />
    <title>Template Preview</title>
    <link href="/img/favicon.png" type="image/png" rel="icon" />
    <link href="/img/favicon.png" type="image/png" rel="shortcut icon" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i|Roboto+Slab:700&amp;display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <table
      style="
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        vertical-align: top;
        min-width: 320px;
        margin: 0 auto;
        background-color: #ffffff;
        width: 100%;
      "
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td style="border-collapse: collapse; vertical-align: top">
            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 700px;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 700px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100%">
                      <div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 20px 0px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div>
                                  <div
                                    dir="ltr"
                                    style="
                                      width: 700px;
                                      background-color: #ffffff;
                                      border: 1px solid #d3d3d3;
                                      margin: 20px 0px 20px 0px;
                                    "
                                  >
                                    <span></span>
                                    <table
                                      width="100%"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="
                                        background-color: #ffffff;
                                        border: 0;
                                        border-collapse: collapse;
                                        border-spacing: 0;
                                      "
                                      bgcolor="#ffffff"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            align="center"
                                            style="display: block"
                                          >
                                            <table
                                              width="100%"
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              style="
                                                border: 0;
                                                border-collapse: collapse;
                                                border-spacing: 0;
                                                max-width: 700px;
                                              "
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      background-color: #ffffff;
                                                    "
                                                  >
                                                    <u></u>
                                                    <table
                                                      width="100%"
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      style="
                                                        border: 0;
                                                        border-collapse: collapse;
                                                        border-spacing: 0;
                                                        margin: auto;
                                                        max-width: 700px;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td align="center">
                                                            <table
                                                              width="100%"
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              style="
                                                                background-color: #fff;
                                                                border: 0;
                                                                border-collapse: collapse;
                                                                border-spacing: 0;
                                                                margin: auto;
                                                              "
                                                              bgcolor="#ffffff"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    align="center"
                                                                  >
                                                                    <table
                                                                      width="100%"
                                                                      border="0"
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      style="
                                                                        border: 0;
                                                                        border-collapse: collapse;
                                                                        border-spacing: 0;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            align="center"
                                                                            style="
                                                                              background-color: #ffffff;
                                                                            "
                                                                          >
                                                                            <table
                                                                              border="0"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              width="100%"
                                                                              style="
                                                                                border: 0;
                                                                                border-collapse: collapse;
                                                                                border-spacing: 0;
                                                                              "
                                                                            >
                                                                              <tbody>
                                                                                <tr>
                                                                                  <td>
                                                                                    <table
                                                                                      width="100%"
                                                                                      border="0"
                                                                                      cellpadding="0"
                                                                                      cellspacing="0"
                                                                                      style="
                                                                                        border: 0;
                                                                                        border-collapse: collapse;
                                                                                        border-spacing: 0;
                                                                                      "
                                                                                    >
                                                                                      <tbody>
                                                                                        <tr>
                                                                                          <td>
                                                                                            <table
                                                                                              width="100%"
                                                                                              border="0"
                                                                                              cellpadding="0"
                                                                                              cellspacing="0"
                                                                                              style="
                                                                                                border: 0;
                                                                                                border-collapse: collapse;
                                                                                                border-spacing: 0;
                                                                                              "
                                                                                            >
                                                                                              <tbody>
                                                                                                <tr>
                                                                                                  <td>
                                                                                                    <table
                                                                                                      width="100%"
                                                                                                      border="0"
                                                                                                      cellpadding="0"
                                                                                                      cellspacing="0"
                                                                                                      style="
                                                                                                        border: none;
                                                                                                        border-collapse: collapse;
                                                                                                        width: 100%;
                                                                                                      "
                                                                                                    >
                                                                                                      <tbody>
                                                                                                        <tr>
                                                                                                          <td
                                                                                                            align="left"
                                                                                                            style="
                                                                                                              text-align: left;
                                                                                                            "
                                                                                                          >
                                                                                                            <table
                                                                                                              border="0"
                                                                                                              cellpadding="0"
                                                                                                              cellspacing="0"
                                                                                                              style="
                                                                                                                border: none;
                                                                                                                border-collapse: collapse;
                                                                                                                width: 100%;
                                                                                                              "
                                                                                                            >
                                                                                                              <tbody>
                                                                                                                <tr>
                                                                                                                  <td
                                                                                                                    valign="top"
                                                                                                                    height="400"
                                                                                                                    bgcolor="#000000"
                                                                                                                    style="
                                                                                                                      background-image: url('https://storage.googleapis.com/template_image_bucket/uber%20gif.gif');
                                                                                                                      text-align: left;
                                                                                                                      height: 400px;
                                                                                                                      background-color: #000000;
                                                                                                                      background-position: left
                                                                                                                        bottom;
                                                                                                                      background-repeat: no-repeat;
                                                                                                                    "
                                                                                                                  >
                                                                                                                    <div>
                                                                                                                      <table
                                                                                                                        width="100%"
                                                                                                                        border="0"
                                                                                                                        cellpadding="0"
                                                                                                                        cellspacing="0"
                                                                                                                        style="
                                                                                                                          border: none;
                                                                                                                          border-collapse: collapse;
                                                                                                                          width: 100%;
                                                                                                                        "
                                                                                                                      >
                                                                                                                        <tbody>
                                                                                                                          <tr>
                                                                                                                            <td
                                                                                                                              width="14"
                                                                                                                              style="
                                                                                                                                text-align: left;
                                                                                                                              "
                                                                                                                            >
                                                                                                                              &nbsp;
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                              align="left"
                                                                                                                              style="
                                                                                                                                text-align: left;
                                                                                                                              "
                                                                                                                            >
                                                                                                                              <table
                                                                                                                                border="0"
                                                                                                                                cellpadding="0"
                                                                                                                                cellspacing="0"
                                                                                                                                style="
                                                                                                                                  border: none;
                                                                                                                                  border-collapse: collapse;
                                                                                                                                  width: 100%;
                                                                                                                                "
                                                                                                                              >
                                                                                                                                <tbody>
                                                                                                                                  <tr>
                                                                                                                                    <td
                                                                                                                                      style="
                                                                                                                                        text-align: left;
                                                                                                                                      "
                                                                                                                                    >
                                                                                                                                      <table
                                                                                                                                        border="0"
                                                                                                                                        cellpadding="0"
                                                                                                                                        cellspacing="0"
                                                                                                                                        align="center"
                                                                                                                                        style="
                                                                                                                                          border-collapse: collapse;
                                                                                                                                          max-width: 560px;
                                                                                                                                          width: 100%;
                                                                                                                                        "
                                                                                                                                      >
                                                                                                                                        <tbody>
                                                                                                                                          <tr>
                                                                                                                                            <td
                                                                                                                                              style="
                                                                                                                                                text-align: left;
                                                                                                                                                font-size: 1px;
                                                                                                                                                height: 1px;
                                                                                                                                                line-height: 1px;
                                                                                                                                                padding-left: 0px;
                                                                                                                                                padding-right: 0px;
                                                                                                                                              "
                                                                                                                                            >
                                                                                                                                              <table
                                                                                                                                                border="0"
                                                                                                                                                cellpadding="0"
                                                                                                                                                cellspacing="0"
                                                                                                                                                width="100%"
                                                                                                                                                align="left"
                                                                                                                                                style="
                                                                                                                                                  border-collapse: collapse;
                                                                                                                                                  table-layout: fixed;
                                                                                                                                                  width: 100%;
                                                                                                                                                "
                                                                                                                                              >
                                                                                                                                                <tbody>
                                                                                                                                                  <tr>
                                                                                                                                                    <td
                                                                                                                                                      style="
                                                                                                                                                        text-align: left;
                                                                                                                                                      "
                                                                                                                                                    >
                                                                                                                                                      <table
                                                                                                                                                        border="0"
                                                                                                                                                        cellpadding="0"
                                                                                                                                                        cellspacing="0"
                                                                                                                                                        align="left"
                                                                                                                                                        style="
                                                                                                                                                          border-collapse: collapse;
                                                                                                                                                          max-width: 515px;
                                                                                                                                                          width: 100%;
                                                                                                                                                        "
                                                                                                                                                      >
                                                                                                                                                        <tbody>
                                                                                                                                                          <tr>
                                                                                                                                                            <td
                                                                                                                                                              width="12"
                                                                                                                                                              style="
                                                                                                                                                                text-align: left;
                                                                                                                                                                font-size: 1px;
                                                                                                                                                                height: 1px;
                                                                                                                                                                line-height: 1px;
                                                                                                                                                                padding-left: 0px;
                                                                                                                                                                padding-right: 0px;
                                                                                                                                                              "
                                                                                                                                                            >
                                                                                                                                                              &nbsp;
                                                                                                                                                            </td>
                                                                                                                                                            <td
                                                                                                                                                              style="
                                                                                                                                                                text-align: left;
                                                                                                                                                                font-size: 1px;
                                                                                                                                                                height: 1px;
                                                                                                                                                                line-height: 1px;
                                                                                                                                                                padding-left: 0px;
                                                                                                                                                                padding-right: 0px;
                                                                                                                                                              "
                                                                                                                                                            >
                                                                                                                                                              <table
                                                                                                                                                                border="0"
                                                                                                                                                                cellpadding="0"
                                                                                                                                                                cellspacing="0"
                                                                                                                                                                width="100%"
                                                                                                                                                                align="left"
                                                                                                                                                                style="
                                                                                                                                                                  border-collapse: collapse;
                                                                                                                                                                  table-layout: fixed;
                                                                                                                                                                  width: 100%;
                                                                                                                                                                "
                                                                                                                                                              >
                                                                                                                                                                <tbody>
                                                                                                                                                                  <tr>
                                                                                                                                                                    <td
                                                                                                                                                                      style="
                                                                                                                                                                        text-align: left;
                                                                                                                                                                        color: #ffffff;
                                                                                                                                                                        font-family: 'Uber Move',
                                                                                                                                                                          HelveticaNeue,
                                                                                                                                                                          Helvetica,
                                                                                                                                                                          Arial,
                                                                                                                                                                          sans-serif;
                                                                                                                                                                        font-size: 34px;
                                                                                                                                                                        font-weight: 500;
                                                                                                                                                                        line-height: 40px;
                                                                                                                                                                        padding-bottom: 7px;
                                                                                                                                                                        padding-top: 50px;
                                                                                                                                                                      "
                                                                                                                                                                    >
                                                                                                                                                                      <p>
                                                                                                                                                                        Welcome
                                                                                                                                                                        to
                                                                                                                                                                      </p>
                                                                                                                                                                    </td>
                                                                                                                                                                  </tr>
                                                                                                                                                                  <tr>
                                                                                                                                                                    <td
                                                                                                                                                                      style="
                                                                                                                                                                        text-align: left;
                                                                                                                                                                        color: #ffffff;
                                                                                                                                                                        font-family: 'Uber Move',
                                                                                                                                                                          HelveticaNeue,
                                                                                                                                                                          Helvetica,
                                                                                                                                                                          Arial,
                                                                                                                                                                          sans-serif;
                                                                                                                                                                        font-size: 34px;
                                                                                                                                                                        font-weight: 500;
                                                                                                                                                                        line-height: 40px;
                                                                                                                                                                        padding-bottom: 0;
                                                                                                                                                                        padding-top: 0;
                                                                                                                                                                      "
                                                                                                                                                                    >
                                                                                                                                                                      <img
                                                                                                                                                                        style="
                                                                                                                                                                          width: 515px;
                                                                                                                                                                        "
                                                                                                                                                                        src=""
                                                                                                                                                                        height="10"
                                                                                                                                                                        border="0"
                                                                                                                                                                        alt=""
                                                                                                                                                                      />
                                                                                                                                                                    </td>
                                                                                                                                                                  </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                              </table>
                                                                                                                                                            </td>
                                                                                                                                                            <td
                                                                                                                                                              width="12"
                                                                                                                                                              style="
                                                                                                                                                                text-align: left;
                                                                                                                                                                font-size: 1px;
                                                                                                                                                                height: 1px;
                                                                                                                                                                line-height: 1px;
                                                                                                                                                                padding-left: 0px;
                                                                                                                                                                padding-right: 0px;
                                                                                                                                                              "
                                                                                                                                                            >
                                                                                                                                                              &nbsp;
                                                                                                                                                            </td>
                                                                                                                                                          </tr>
                                                                                                                                                        </tbody>
                                                                                                                                                      </table>
                                                                                                                                                      <table
                                                                                                                                                        border="0"
                                                                                                                                                        cellpadding="0"
                                                                                                                                                        cellspacing="0"
                                                                                                                                                        align="left"
                                                                                                                                                        style="
                                                                                                                                                          border-collapse: collapse;
                                                                                                                                                          max-width: 41px;
                                                                                                                                                          width: 100%;
                                                                                                                                                        "
                                                                                                                                                      >
                                                                                                                                                        <tbody>
                                                                                                                                                          <tr>
                                                                                                                                                            <td
                                                                                                                                                              style="
                                                                                                                                                                text-align: left;
                                                                                                                                                                padding-left: 12px;
                                                                                                                                                                padding-right: 12px;
                                                                                                                                                              "
                                                                                                                                                            >
                                                                                                                                                              <table
                                                                                                                                                                border="0"
                                                                                                                                                                cellpadding="0"
                                                                                                                                                                cellspacing="0"
                                                                                                                                                                width="100%"
                                                                                                                                                                align="left"
                                                                                                                                                                style="
                                                                                                                                                                  border-collapse: collapse;
                                                                                                                                                                  table-layout: fixed;
                                                                                                                                                                  width: 100%;
                                                                                                                                                                "
                                                                                                                                                              >
                                                                                                                                                                <tbody>
                                                                                                                                                                  <tr>
                                                                                                                                                                    <td
                                                                                                                                                                      height="120"
                                                                                                                                                                      style="
                                                                                                                                                                        text-align: left;
                                                                                                                                                                        font-size: 1px;
                                                                                                                                                                        line-height: 1px;
                                                                                                                                                                        height: 120px;
                                                                                                                                                                        min-height: 120px;
                                                                                                                                                                      "
                                                                                                                                                                    >
                                                                                                                                                                      &nbsp;
                                                                                                                                                                    </td>
                                                                                                                                                                  </tr>
                                                                                                                                                                </tbody>
                                                                                                                                                              </table>
                                                                                                                                                            </td>
                                                                                                                                                          </tr>
                                                                                                                                                        </tbody>
                                                                                                                                                      </table>
                                                                                                                                                    </td>
                                                                                                                                                  </tr>
                                                                                                                                                </tbody>
                                                                                                                                              </table>
                                                                                                                                            </td>
                                                                                                                                          </tr>
                                                                                                                                        </tbody>
                                                                                                                                      </table>
                                                                                                                                    </td>
                                                                                                                                  </tr>
                                                                                                                                </tbody>
                                                                                                                              </table>
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                              width="14"
                                                                                                                              style="
                                                                                                                                text-align: left;
                                                                                                                              "
                                                                                                                            >
                                                                                                                              &nbsp;
                                                                                                                            </td>
                                                                                                                          </tr>
                                                                                                                        </tbody>
                                                                                                                      </table>
                                                                                                                    </div>
                                                                                                                  </td>
                                                                                                                </tr>
                                                                                                              </tbody>
                                                                                                            </table>
                                                                                                          </td>
                                                                                                        </tr>
                                                                                                      </tbody>
                                                                                                    </table>
                                                                                                    <table
                                                                                                      width="100%"
                                                                                                      border="0"
                                                                                                      cellpadding="0"
                                                                                                      cellspacing="0"
                                                                                                      style="
                                                                                                        border-collapse: collapse;
                                                                                                        width: 100%;
                                                                                                      "
                                                                                                    >
                                                                                                      <tbody>
                                                                                                        <tr>
                                                                                                          <td
                                                                                                            align="left"
                                                                                                            style="
                                                                                                              text-align: left;
                                                                                                              padding: 0
                                                                                                                14px
                                                                                                                0
                                                                                                                14px;
                                                                                                            "
                                                                                                          >
                                                                                                            <table
                                                                                                              border="0"
                                                                                                              cellpadding="0"
                                                                                                              cellspacing="0"
                                                                                                              style="
                                                                                                                border-collapse: collapse;
                                                                                                                width: 100%;
                                                                                                              "
                                                                                                            >
                                                                                                              <tbody>
                                                                                                                <tr>
                                                                                                                  <td
                                                                                                                    style="
                                                                                                                      text-align: left;
                                                                                                                    "
                                                                                                                  >
                                                                                                                    <table
                                                                                                                      border="0"
                                                                                                                      cellpadding="0"
                                                                                                                      cellspacing="0"
                                                                                                                      align="center"
                                                                                                                      style="
                                                                                                                        margin: 0
                                                                                                                          auto;
                                                                                                                        border-collapse: collapse;
                                                                                                                        max-width: 560px;
                                                                                                                        width: 100%;
                                                                                                                      "
                                                                                                                    >
                                                                                                                      <tbody>
                                                                                                                        <tr>
                                                                                                                          <td
                                                                                                                            style="
                                                                                                                              text-align: left;
                                                                                                                              padding-left: 12px;
                                                                                                                              padding-right: 12px;
                                                                                                                            "
                                                                                                                          >
                                                                                                                            <table
                                                                                                                              border="0"
                                                                                                                              cellpadding="0"
                                                                                                                              cellspacing="0"
                                                                                                                              width="100%"
                                                                                                                              align="left"
                                                                                                                              style="
                                                                                                                                border-collapse: collapse;
                                                                                                                                table-layout: fixed;
                                                                                                                                width: 100%;
                                                                                                                              "
                                                                                                                            >
                                                                                                                              <tbody>
                                                                                                                                <tr>
                                                                                                                                  <td
                                                                                                                                    style="
                                                                                                                                      text-align: left;
                                                                                                                                    "
                                                                                                                                  >
                                                                                                                                    <table
                                                                                                                                      border="0"
                                                                                                                                      cellpadding="0"
                                                                                                                                      cellspacing="0"
                                                                                                                                      align="left"
                                                                                                                                      style="
                                                                                                                                        margin: 0
                                                                                                                                          auto;
                                                                                                                                        border-collapse: collapse;
                                                                                                                                        max-width: 504px;
                                                                                                                                        width: 100%;
                                                                                                                                      "
                                                                                                                                    >
                                                                                                                                      <tbody>
                                                                                                                                        <tr>
                                                                                                                                          <td
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              color: #000000;
                                                                                                                                              font-family: 'Uber Move',
                                                                                                                                                HelveticaNeue,
                                                                                                                                                Helvetica,
                                                                                                                                                Arial,
                                                                                                                                                sans-serif;
                                                                                                                                              font-size: 34px;
                                                                                                                                              font-weight: 500;
                                                                                                                                              line-height: 40px;
                                                                                                                                              padding-bottom: 13px;
                                                                                                                                              padding-top: 54px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <p>
                                                                                                                                              Where
                                                                                                                                              are
                                                                                                                                              you
                                                                                                                                              going
                                                                                                                                              now?
                                                                                                                                            </p>
                                                                                                                                          </td>
                                                                                                                                        </tr>
                                                                                                                                        <tr>
                                                                                                                                          <td
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              color: #000000;
                                                                                                                                              font-family: 'Uber Move Text',
                                                                                                                                                HelveticaNeue,
                                                                                                                                                Helvetica,
                                                                                                                                                Arial,
                                                                                                                                                sans-serif;
                                                                                                                                              font-size: 16px;
                                                                                                                                              font-weight: normal;
                                                                                                                                              line-height: 22px;
                                                                                                                                              padding-bottom: 7px;
                                                                                                                                              padding-top: 7px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <p>
                                                                                                                                              Hello
                                                                                                                                              %Username%,
                                                                                                                                              we
                                                                                                                                              love
                                                                                                                                              having
                                                                                                                                              you
                                                                                                                                              with
                                                                                                                                              us
                                                                                                                                              in
                                                                                                                                              %Current_month%
                                                                                                                                              %Current_year%.
                                                                                                                                              No
                                                                                                                                              matter
                                                                                                                                              where
                                                                                                                                              you're
                                                                                                                                              going,
                                                                                                                                              you
                                                                                                                                              just
                                                                                                                                              need
                                                                                                                                              to
                                                                                                                                              press
                                                                                                                                              a
                                                                                                                                              button
                                                                                                                                              to
                                                                                                                                              request
                                                                                                                                              a
                                                                                                                                              ride.
                                                                                                                                            </p>
                                                                                                                                          </td>
                                                                                                                                        </tr>
                                                                                                                                        <tr>
                                                                                                                                          <td
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              padding-top: 18px;
                                                                                                                                              padding-bottom: 18px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <div
                                                                                                                                              lang="x-btn"
                                                                                                                                              style="
                                                                                                                                                font-family: 'Uber Move Text',
                                                                                                                                                  HelveticaNeue,
                                                                                                                                                  Helvetica,
                                                                                                                                                  Arial,
                                                                                                                                                  sans-serif;
                                                                                                                                                font-size: 16px;
                                                                                                                                                font-weight: 700;
                                                                                                                                                line-height: 22px;
                                                                                                                                              "
                                                                                                                                              xml:lang="x-btn"
                                                                                                                                            >
                                                                                                                                              <a
                                                                                                                                                href="%LandingPageURL%"
                                                                                                                                                style="
                                                                                                                                                  background-color: #000000;
                                                                                                                                                  border-color: #000000;
                                                                                                                                                  border-style: solid;
                                                                                                                                                  border-width: 13px
                                                                                                                                                    18px;
                                                                                                                                                  color: #ffffff;
                                                                                                                                                  display: inline-block;
                                                                                                                                                  letter-spacing: 1px;
                                                                                                                                                  max-width: 300px;
                                                                                                                                                  min-width: 100px;
                                                                                                                                                  text-align: center;
                                                                                                                                                  text-decoration: none;
                                                                                                                                                "
                                                                                                                                              >
                                                                                                                                                <span
                                                                                                                                                  style="
                                                                                                                                                    display: inline-block;
                                                                                                                                                    text-align: left;
                                                                                                                                                  "
                                                                                                                                                  >Check
                                                                                                                                                  our
                                                                                                                                                  prices</span
                                                                                                                                                >
                                                                                                                                                <span
                                                                                                                                                  style="
                                                                                                                                                    display: inline-block;
                                                                                                                                                    padding-top: 3px;
                                                                                                                                                    float: right;
                                                                                                                                                  "
                                                                                                                                                >
                                                                                                                                                  <img
                                                                                                                                                    style="
                                                                                                                                                      width: 14px;
                                                                                                                                                    "
                                                                                                                                                    src="https://storage.googleapis.com/template_image_bucket/arrow-right.png"
                                                                                                                                                    height="13"
                                                                                                                                                    alt=""
                                                                                                                                                  />
                                                                                                                                                </span>
                                                                                                                                              </a>
                                                                                                                                            </div>
                                                                                                                                          </td>
                                                                                                                                        </tr>
                                                                                                                                      </tbody>
                                                                                                                                    </table>
                                                                                                                                  </td>
                                                                                                                                </tr>
                                                                                                                              </tbody>
                                                                                                                            </table>
                                                                                                                          </td>
                                                                                                                        </tr>
                                                                                                                      </tbody>
                                                                                                                    </table>
                                                                                                                  </td>
                                                                                                                </tr>
                                                                                                              </tbody>
                                                                                                            </table>
                                                                                                          </td>
                                                                                                        </tr>
                                                                                                      </tbody>
                                                                                                    </table>
                                                                                                    <table
                                                                                                      width="100%"
                                                                                                      border="0"
                                                                                                      cellpadding="0"
                                                                                                      cellspacing="0"
                                                                                                      style="
                                                                                                        border-collapse: collapse;
                                                                                                        width: 100%;
                                                                                                      "
                                                                                                    >
                                                                                                      <tbody>
                                                                                                        <tr>
                                                                                                          <td
                                                                                                            align="left"
                                                                                                            style="
                                                                                                              text-align: left;
                                                                                                              padding: 0
                                                                                                                14px
                                                                                                                0
                                                                                                                14px;
                                                                                                              padding-bottom: 25px;
                                                                                                              padding-left: 0;
                                                                                                              padding-right: 14px;
                                                                                                              padding-top: 25px;
                                                                                                            "
                                                                                                          >
                                                                                                            <table
                                                                                                              border="0"
                                                                                                              cellpadding="0"
                                                                                                              cellspacing="0"
                                                                                                              style="
                                                                                                                border: none;
                                                                                                                border-collapse: collapse;
                                                                                                                width: 100%;
                                                                                                              "
                                                                                                            >
                                                                                                              <tbody>
                                                                                                                <tr>
                                                                                                                  <td
                                                                                                                    style="
                                                                                                                      text-align: left;
                                                                                                                    "
                                                                                                                  >
                                                                                                                    <table
                                                                                                                      border="0"
                                                                                                                      cellpadding="0"
                                                                                                                      cellspacing="0"
                                                                                                                      align="left"
                                                                                                                      style="
                                                                                                                        margin: 0
                                                                                                                          auto;
                                                                                                                        border-collapse: collapse;
                                                                                                                        max-width: 318px;
                                                                                                                        width: 100%;
                                                                                                                      "
                                                                                                                    >
                                                                                                                      <tbody>
                                                                                                                        <tr>
                                                                                                                          <td
                                                                                                                            style="
                                                                                                                              text-align: left;
                                                                                                                              padding-left: 0;
                                                                                                                              padding-right: 12px;
                                                                                                                            "
                                                                                                                          >
                                                                                                                            <table
                                                                                                                              border="0"
                                                                                                                              cellpadding="0"
                                                                                                                              cellspacing="0"
                                                                                                                              width="100%"
                                                                                                                              align="left"
                                                                                                                              style="
                                                                                                                                border-collapse: collapse;
                                                                                                                                table-layout: fixed;
                                                                                                                                width: 100%;
                                                                                                                              "
                                                                                                                            >
                                                                                                                              <tbody>
                                                                                                                                <tr>
                                                                                                                                  <td
                                                                                                                                    style="
                                                                                                                                      text-align: left;
                                                                                                                                      padding-bottom: 22px;
                                                                                                                                    "
                                                                                                                                  >
                                                                                                                                    <img
                                                                                                                                      style="
                                                                                                                                        width: 306px;
                                                                                                                                      "
                                                                                                                                      src="https://storage.googleapis.com/template_image_bucket/abstract-3.png"
                                                                                                                                      border="0"
                                                                                                                                      alt=""
                                                                                                                                    />
                                                                                                                                    <div
                                                                                                                                      dir="ltr"
                                                                                                                                      style="
                                                                                                                                        opacity: 0.01;
                                                                                                                                        left: 488px;
                                                                                                                                        top: 820.6px;
                                                                                                                                      "
                                                                                                                                    >
                                                                                                                                      <div>
                                                                                                                                        <div>
                                                                                                                                          <div></div>
                                                                                                                                        </div>
                                                                                                                                      </div>
                                                                                                                                    </div>
                                                                                                                                  </td>
                                                                                                                                </tr>
                                                                                                                              </tbody>
                                                                                                                            </table>
                                                                                                                          </td>
                                                                                                                        </tr>
                                                                                                                      </tbody>
                                                                                                                    </table>
                                                                                                                    <table
                                                                                                                      border="0"
                                                                                                                      cellpadding="0"
                                                                                                                      cellspacing="0"
                                                                                                                      align="left"
                                                                                                                      style="
                                                                                                                        margin: 0
                                                                                                                          auto;
                                                                                                                        border-collapse: collapse;
                                                                                                                        max-width: 368px;
                                                                                                                        width: 100%;
                                                                                                                      "
                                                                                                                    >
                                                                                                                      <tbody>
                                                                                                                        <tr>
                                                                                                                          <td
                                                                                                                            style="
                                                                                                                              text-align: left;
                                                                                                                              padding-left: 26px;
                                                                                                                              padding-right: 12px;
                                                                                                                            "
                                                                                                                          >
                                                                                                                            <table
                                                                                                                              border="0"
                                                                                                                              cellpadding="0"
                                                                                                                              cellspacing="0"
                                                                                                                              width="100%"
                                                                                                                              align="left"
                                                                                                                              style="
                                                                                                                                border-collapse: collapse;
                                                                                                                                table-layout: fixed;
                                                                                                                                width: 100%;
                                                                                                                              "
                                                                                                                            >
                                                                                                                              <tbody>
                                                                                                                                <tr>
                                                                                                                                  <td
                                                                                                                                    style="
                                                                                                                                      text-align: left;
                                                                                                                                    "
                                                                                                                                  >
                                                                                                                                    <table
                                                                                                                                      border="0"
                                                                                                                                      cellpadding="0"
                                                                                                                                      cellspacing="0"
                                                                                                                                      align="left"
                                                                                                                                      style="
                                                                                                                                        margin: 0
                                                                                                                                          auto;
                                                                                                                                        border-collapse: collapse;
                                                                                                                                        max-width: 280px;
                                                                                                                                        width: 100%;
                                                                                                                                      "
                                                                                                                                    >
                                                                                                                                      <tbody>
                                                                                                                                        <tr>
                                                                                                                                          <td
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              color: #000000;
                                                                                                                                              font-family: 'Uber Move',
                                                                                                                                                HelveticaNeue,
                                                                                                                                                Helvetica,
                                                                                                                                                Arial,
                                                                                                                                                sans-serif;
                                                                                                                                              font-size: 28px;
                                                                                                                                              font-weight: 500;
                                                                                                                                              line-height: 36px;
                                                                                                                                              padding-bottom: 7px;
                                                                                                                                              padding-left: 0;
                                                                                                                                              padding-right: 0;
                                                                                                                                              padding-top: 7px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <p>
                                                                                                                                              Move
                                                                                                                                              in
                                                                                                                                              more
                                                                                                                                              than
                                                                                                                                              700
                                                                                                                                              cities
                                                                                                                                            </p>
                                                                                                                                          </td>
                                                                                                                                        </tr>
                                                                                                                                        <tr>
                                                                                                                                          <td
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              color: #000000;
                                                                                                                                              font-family: 'Uber Move Text',
                                                                                                                                                HelveticaNeue,
                                                                                                                                                Helvetica,
                                                                                                                                                Arial,
                                                                                                                                                sans-serif;
                                                                                                                                              font-size: 16px;
                                                                                                                                              font-weight: normal;
                                                                                                                                              line-height: 22px;
                                                                                                                                              padding-bottom: 7px;
                                                                                                                                              padding-left: 0;
                                                                                                                                              padding-right: 0;
                                                                                                                                              padding-top: 7px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <p>
                                                                                                                                              Whether
                                                                                                                                              you're
                                                                                                                                              in
                                                                                                                                              your
                                                                                                                                              hometown
                                                                                                                                              or
                                                                                                                                              exploring
                                                                                                                                              a
                                                                                                                                              city
                                                                                                                                              far
                                                                                                                                              from
                                                                                                                                              home,
                                                                                                                                              the
                                                                                                                                              ability
                                                                                                                                              to
                                                                                                                                              request
                                                                                                                                              a
                                                                                                                                              ride
                                                                                                                                              is
                                                                                                                                              at
                                                                                                                                              your
                                                                                                                                              fingertips.
                                                                                                                                            </p>
                                                                                                                                          </td>
                                                                                                                                        </tr>
                                                                                                                                      </tbody>
                                                                                                                                    </table>
                                                                                                                                  </td>
                                                                                                                                </tr>
                                                                                                                              </tbody>
                                                                                                                            </table>
                                                                                                                          </td>
                                                                                                                        </tr>
                                                                                                                      </tbody>
                                                                                                                    </table>
                                                                                                                  </td>
                                                                                                                </tr>
                                                                                                              </tbody>
                                                                                                            </table>
                                                                                                          </td>
                                                                                                        </tr>
                                                                                                      </tbody>
                                                                                                    </table>
                                                                                                    <table
                                                                                                      width="100%"
                                                                                                      border="0"
                                                                                                      cellpadding="0"
                                                                                                      cellspacing="0"
                                                                                                      style="
                                                                                                        border-collapse: collapse;
                                                                                                        width: 100%;
                                                                                                      "
                                                                                                    >
                                                                                                      <tbody>
                                                                                                        <tr>
                                                                                                          <td
                                                                                                            align="left"
                                                                                                            bgcolor="#f6f6f6"
                                                                                                            style="
                                                                                                              padding: 0
                                                                                                                14px
                                                                                                                0
                                                                                                                14px;
                                                                                                              text-align: left;
                                                                                                            "
                                                                                                          >
                                                                                                            <table
                                                                                                              border="0"
                                                                                                              cellpadding="0"
                                                                                                              cellspacing="0"
                                                                                                              style="
                                                                                                                border: none;
                                                                                                                border-collapse: collapse;
                                                                                                                width: 100%;
                                                                                                              "
                                                                                                            >
                                                                                                              <tbody>
                                                                                                                <tr>
                                                                                                                  <td
                                                                                                                    style="
                                                                                                                      text-align: left;
                                                                                                                      padding-top: 50px;
                                                                                                                      padding-bottom: 50px;
                                                                                                                    "
                                                                                                                  >
                                                                                                                    <table
                                                                                                                      border="0"
                                                                                                                      cellpadding="0"
                                                                                                                      cellspacing="0"
                                                                                                                      align="center"
                                                                                                                      style="
                                                                                                                        margin: 0
                                                                                                                          auto;
                                                                                                                        border-collapse: collapse;
                                                                                                                        max-width: 560px;
                                                                                                                        width: 100%;
                                                                                                                      "
                                                                                                                    >
                                                                                                                      <tbody>
                                                                                                                        <tr>
                                                                                                                          <td
                                                                                                                            style="
                                                                                                                              text-align: left;
                                                                                                                              padding-left: 12px;
                                                                                                                              padding-right: 12px;
                                                                                                                            "
                                                                                                                          >
                                                                                                                            <table
                                                                                                                              border="0"
                                                                                                                              cellpadding="0"
                                                                                                                              cellspacing="0"
                                                                                                                              width="100%"
                                                                                                                              align="left"
                                                                                                                              style="
                                                                                                                                border-collapse: collapse;
                                                                                                                                table-layout: fixed;
                                                                                                                                width: 100%;
                                                                                                                              "
                                                                                                                            >
                                                                                                                              <tbody>
                                                                                                                                <tr>
                                                                                                                                  <td
                                                                                                                                    style="
                                                                                                                                      color: #000000;
                                                                                                                                      font-family: 'Uber Move',
                                                                                                                                        HelveticaNeue,
                                                                                                                                        Helvetica,
                                                                                                                                        Arial,
                                                                                                                                        sans-serif;
                                                                                                                                      font-size: 34px;
                                                                                                                                      font-weight: 500;
                                                                                                                                      line-height: 40px;
                                                                                                                                      padding-bottom: 58px;
                                                                                                                                      padding-top: 7px;
                                                                                                                                      text-align: left;
                                                                                                                                    "
                                                                                                                                  >
                                                                                                                                    <p>
                                                                                                                                      How
                                                                                                                                      to
                                                                                                                                      request
                                                                                                                                      a
                                                                                                                                      ride
                                                                                                                                      (%Current_time%
                                                                                                                                      %Current_day%
                                                                                                                                      %Current_month%):
                                                                                                                                    </p>
                                                                                                                                  </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                  <td
                                                                                                                                    style="
                                                                                                                                      text-align: left;
                                                                                                                                    "
                                                                                                                                  >
                                                                                                                                    <table
                                                                                                                                      border="0"
                                                                                                                                      cellpadding="0"
                                                                                                                                      cellspacing="0"
                                                                                                                                      width="100%"
                                                                                                                                      align="left"
                                                                                                                                      style="
                                                                                                                                        border-collapse: collapse;
                                                                                                                                        table-layout: fixed;
                                                                                                                                        width: 100%;
                                                                                                                                      "
                                                                                                                                    >
                                                                                                                                      <tbody>
                                                                                                                                        <tr>
                                                                                                                                          <td
                                                                                                                                            width="9"
                                                                                                                                            valign="top"
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              padding-top: 0px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <img
                                                                                                                                              style="
                                                                                                                                                width: 9px;
                                                                                                                                              "
                                                                                                                                              src="https://storage.googleapis.com/template_image_bucket/left.png"
                                                                                                                                              height="19"
                                                                                                                                              alt=""
                                                                                                                                            />
                                                                                                                                          </td>
                                                                                                                                          <td
                                                                                                                                            width="2"
                                                                                                                                            valign="top"
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              background-color: #000000;
                                                                                                                                              padding-top: 0px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <img
                                                                                                                                              style="
                                                                                                                                                width: 2px;
                                                                                                                                              "
                                                                                                                                              src="https://storage.googleapis.com/template_image_bucket/vertical%20black%20line.png"
                                                                                                                                              height="19"
                                                                                                                                              alt=""
                                                                                                                                            />
                                                                                                                                          </td>
                                                                                                                                          <td
                                                                                                                                            width="9"
                                                                                                                                            valign="top"
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              padding-top: 0px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <img
                                                                                                                                              style="
                                                                                                                                                width: 9px;
                                                                                                                                              "
                                                                                                                                              src="https://storage.googleapis.com/template_image_bucket/right.png"
                                                                                                                                              height="19"
                                                                                                                                              alt=""
                                                                                                                                            />
                                                                                                                                          </td>
                                                                                                                                          <td
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              padding-left: 34px;
                                                                                                                                              padding-top: 0;
                                                                                                                                              padding-bottom: 44px;
                                                                                                                                              line-height: 20px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <table
                                                                                                                                              border="0"
                                                                                                                                              cellpadding="0"
                                                                                                                                              cellspacing="0"
                                                                                                                                              width="100%"
                                                                                                                                              align="left"
                                                                                                                                              style="
                                                                                                                                                border-collapse: collapse;
                                                                                                                                                table-layout: fixed;
                                                                                                                                                width: 100%;
                                                                                                                                              "
                                                                                                                                            >
                                                                                                                                              <tbody>
                                                                                                                                                <tr>
                                                                                                                                                  <td
                                                                                                                                                    style="
                                                                                                                                                      color: #000000;
                                                                                                                                                      font-family: 'Uber Move Text',
                                                                                                                                                        HelveticaNeue,
                                                                                                                                                        Helvetica,
                                                                                                                                                        Arial,
                                                                                                                                                        sans-serif;
                                                                                                                                                      font-size: 16px;
                                                                                                                                                      font-weight: bold;
                                                                                                                                                      line-height: 22px;
                                                                                                                                                      padding-bottom: 7px;
                                                                                                                                                      padding-top: 0;
                                                                                                                                                      text-align: left;
                                                                                                                                                    "
                                                                                                                                                  >
                                                                                                                                                    <p>
                                                                                                                                                      Enter
                                                                                                                                                      your
                                                                                                                                                      destination
                                                                                                                                                    </p>
                                                                                                                                                  </td>
                                                                                                                                                </tr>
                                                                                                                                                <tr>
                                                                                                                                                  <td
                                                                                                                                                    style="
                                                                                                                                                      color: #000000;
                                                                                                                                                      font-family: 'Uber Move Text',
                                                                                                                                                        HelveticaNeue,
                                                                                                                                                        Helvetica,
                                                                                                                                                        Arial,
                                                                                                                                                        sans-serif;
                                                                                                                                                      font-size: 16px;
                                                                                                                                                      font-weight: normal;
                                                                                                                                                      line-height: 22px;
                                                                                                                                                      padding-bottom: 7px;
                                                                                                                                                      padding-top: 7px;
                                                                                                                                                      text-align: left;
                                                                                                                                                    "
                                                                                                                                                  >
                                                                                                                                                    <p>
                                                                                                                                                      Tell
                                                                                                                                                      the
                                                                                                                                                      app
                                                                                                                                                      where
                                                                                                                                                      you're
                                                                                                                                                      going
                                                                                                                                                      (planned
                                                                                                                                                      for
                                                                                                                                                      %Future_date%),
                                                                                                                                                      tap
                                                                                                                                                      to
                                                                                                                                                      confirm
                                                                                                                                                      and
                                                                                                                                                      track
                                                                                                                                                      your
                                                                                                                                                      driver
                                                                                                                                                      in
                                                                                                                                                      real-time
                                                                                                                                                      on
                                                                                                                                                      the
                                                                                                                                                      map.
                                                                                                                                                    </p>
                                                                                                                                                  </td>
                                                                                                                                                </tr>
                                                                                                                                              </tbody>
                                                                                                                                            </table>
                                                                                                                                          </td>
                                                                                                                                        </tr>
                                                                                                                                        <tr>
                                                                                                                                          <td
                                                                                                                                            width="9"
                                                                                                                                            valign="top"
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              padding-top: 0px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <img
                                                                                                                                              style="
                                                                                                                                                width: 9px;
                                                                                                                                              "
                                                                                                                                              src="https://storage.googleapis.com/template_image_bucket/left.png"
                                                                                                                                              height="19"
                                                                                                                                              alt=""
                                                                                                                                            />
                                                                                                                                          </td>
                                                                                                                                          <td
                                                                                                                                            width="2"
                                                                                                                                            valign="top"
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              background-color: #000000;
                                                                                                                                              padding-top: 0px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <img
                                                                                                                                              style="
                                                                                                                                                width: 2px;
                                                                                                                                              "
                                                                                                                                              src="https://storage.googleapis.com/template_image_bucket/vertical%20black%20line.png"
                                                                                                                                              height="19"
                                                                                                                                              alt=""
                                                                                                                                            />
                                                                                                                                          </td>
                                                                                                                                          <td
                                                                                                                                            width="9"
                                                                                                                                            valign="top"
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              padding-top: 0px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <img
                                                                                                                                              style="
                                                                                                                                                width: 9px;
                                                                                                                                              "
                                                                                                                                              src="https://storage.googleapis.com/template_image_bucket/right.png"
                                                                                                                                              height="19"
                                                                                                                                              alt=""
                                                                                                                                            />
                                                                                                                                          </td>
                                                                                                                                          <td
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              padding-left: 34px;
                                                                                                                                              padding-top: 0;
                                                                                                                                              padding-bottom: 44px;
                                                                                                                                              line-height: 20px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <table
                                                                                                                                              border="0"
                                                                                                                                              cellpadding="0"
                                                                                                                                              cellspacing="0"
                                                                                                                                              width="100%"
                                                                                                                                              align="left"
                                                                                                                                              style="
                                                                                                                                                border-collapse: collapse;
                                                                                                                                                table-layout: fixed;
                                                                                                                                                width: 100%;
                                                                                                                                              "
                                                                                                                                            >
                                                                                                                                              <tbody>
                                                                                                                                                <tr>
                                                                                                                                                  <td
                                                                                                                                                    style="
                                                                                                                                                      color: #000000;
                                                                                                                                                      font-family: 'Uber Move Text',
                                                                                                                                                        HelveticaNeue,
                                                                                                                                                        Helvetica,
                                                                                                                                                        Arial,
                                                                                                                                                        sans-serif;
                                                                                                                                                      font-size: 16px;
                                                                                                                                                      font-weight: bold;
                                                                                                                                                      line-height: 22px;
                                                                                                                                                      padding-bottom: 7px;
                                                                                                                                                      padding-top: 0;
                                                                                                                                                      text-align: left;
                                                                                                                                                    "
                                                                                                                                                  >
                                                                                                                                                    <p>
                                                                                                                                                      Verify
                                                                                                                                                      your
                                                                                                                                                      ride
                                                                                                                                                    </p>
                                                                                                                                                  </td>
                                                                                                                                                </tr>
                                                                                                                                                <tr>
                                                                                                                                                  <td
                                                                                                                                                    style="
                                                                                                                                                      color: #000000;
                                                                                                                                                      font-family: 'Uber Move Text',
                                                                                                                                                        HelveticaNeue,
                                                                                                                                                        Helvetica,
                                                                                                                                                        Arial,
                                                                                                                                                        sans-serif;
                                                                                                                                                      font-size: 16px;
                                                                                                                                                      font-weight: normal;
                                                                                                                                                      line-height: 22px;
                                                                                                                                                      padding-bottom: 7px;
                                                                                                                                                      padding-top: 7px;
                                                                                                                                                      text-align: left;
                                                                                                                                                    "
                                                                                                                                                  >
                                                                                                                                                    <p>
                                                                                                                                                      Don't
                                                                                                                                                      forget
                                                                                                                                                      to
                                                                                                                                                      check
                                                                                                                                                      the
                                                                                                                                                      car
                                                                                                                                                      and
                                                                                                                                                      driver
                                                                                                                                                      details
                                                                                                                                                      in
                                                                                                                                                      your
                                                                                                                                                      app,
                                                                                                                                                      and
                                                                                                                                                      verify
                                                                                                                                                      they
                                                                                                                                                      match
                                                                                                                                                      the
                                                                                                                                                      car
                                                                                                                                                      and
                                                                                                                                                      driver
                                                                                                                                                      picking
                                                                                                                                                      you
                                                                                                                                                      up.
                                                                                                                                                    </p>
                                                                                                                                                  </td>
                                                                                                                                                </tr>
                                                                                                                                              </tbody>
                                                                                                                                            </table>
                                                                                                                                          </td>
                                                                                                                                        </tr>
                                                                                                                                        <tr>
                                                                                                                                          <td
                                                                                                                                            width="9"
                                                                                                                                            valign="top"
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              padding-top: 0px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <img
                                                                                                                                              style="
                                                                                                                                                width: 9px;
                                                                                                                                              "
                                                                                                                                              src="https://storage.googleapis.com/template_image_bucket/left.png"
                                                                                                                                              height="19"
                                                                                                                                              alt=""
                                                                                                                                            />
                                                                                                                                          </td>
                                                                                                                                          <td
                                                                                                                                            width="2"
                                                                                                                                            valign="top"
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              padding-top: 0px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <img
                                                                                                                                              style="
                                                                                                                                                width: 2px;
                                                                                                                                              "
                                                                                                                                              src="https://storage.googleapis.com/template_image_bucket/vertical%20black%20line.png"
                                                                                                                                              height="19"
                                                                                                                                              alt=""
                                                                                                                                            />
                                                                                                                                          </td>
                                                                                                                                          <td
                                                                                                                                            width="9"
                                                                                                                                            valign="top"
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              padding-top: 0px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <img
                                                                                                                                              style="
                                                                                                                                                width: 9px;
                                                                                                                                              "
                                                                                                                                              src="https://storage.googleapis.com/template_image_bucket/right.png"
                                                                                                                                              height="19"
                                                                                                                                              alt=""
                                                                                                                                            />
                                                                                                                                          </td>
                                                                                                                                          <td
                                                                                                                                            style="
                                                                                                                                              text-align: left;
                                                                                                                                              padding-left: 34px;
                                                                                                                                              padding-top: 0;
                                                                                                                                              padding-bottom: 44px;
                                                                                                                                              line-height: 20px;
                                                                                                                                            "
                                                                                                                                          >
                                                                                                                                            <table
                                                                                                                                              border="0"
                                                                                                                                              cellpadding="0"
                                                                                                                                              cellspacing="0"
                                                                                                                                              width="100%"
                                                                                                                                              align="left"
                                                                                                                                              style="
                                                                                                                                                border-collapse: collapse;
                                                                                                                                                table-layout: fixed;
                                                                                                                                                width: 100%;
                                                                                                                                              "
                                                                                                                                            >
                                                                                                                                              <tbody>
                                                                                                                                                <tr>
                                                                                                                                                  <td
                                                                                                                                                    style="
                                                                                                                                                      color: #000000;
                                                                                                                                                      font-family: 'Uber Move Text',
                                                                                                                                                        HelveticaNeue,
                                                                                                                                                        Helvetica,
                                                                                                                                                        Arial,
                                                                                                                                                        sans-serif;
                                                                                                                                                      font-size: 16px;
                                                                                                                                                      font-weight: bold;
                                                                                                                                                      line-height: 22px;
                                                                                                                                                      padding-bottom: 7px;
                                                                                                                                                      padding-top: 0;
                                                                                                                                                      text-align: left;
                                                                                                                                                    "
                                                                                                                                                  >
                                                                                                                                                    <p>
                                                                                                                                                      Take
                                                                                                                                                      a
                                                                                                                                                      seat
                                                                                                                                                      and
                                                                                                                                                      relax
                                                                                                                                                    </p>
                                                                                                                                                  </td>
                                                                                                                                                </tr>
                                                                                                                                                <tr>
                                                                                                                                                  <td
                                                                                                                                                    style="
                                                                                                                                                      color: #000000;
                                                                                                                                                      font-family: 'Uber Move Text',
                                                                                                                                                        HelveticaNeue,
                                                                                                                                                        Helvetica,
                                                                                                                                                        Arial,
                                                                                                                                                        sans-serif;
                                                                                                                                                      font-size: 16px;
                                                                                                                                                      font-weight: normal;
                                                                                                                                                      line-height: 22px;
                                                                                                                                                      padding-bottom: 7px;
                                                                                                                                                      padding-top: 7px;
                                                                                                                                                      text-align: left;
                                                                                                                                                    "
                                                                                                                                                  >
                                                                                                                                                    <p>
                                                                                                                                                      Meet
                                                                                                                                                      your
                                                                                                                                                      driver
                                                                                                                                                      at
                                                                                                                                                      the
                                                                                                                                                      pickup
                                                                                                                                                      point,
                                                                                                                                                      greet
                                                                                                                                                      them
                                                                                                                                                      and
                                                                                                                                                      enjoy
                                                                                                                                                      the
                                                                                                                                                      ride
                                                                                                                                                      (improved
                                                                                                                                                      since
                                                                                                                                                      %Previous_year%).
                                                                                                                                                    </p>
                                                                                                                                                  </td>
                                                                                                                                                </tr>
                                                                                                                                              </tbody>
                                                                                                                                            </table>
                                                                                                                                          </td>
                                                                                                                                        </tr>
                                                                                                                                      </tbody>
                                                                                                                                    </table>
                                                                                                                                  </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                  <td
                                                                                                                                    style="
                                                                                                                                      text-align: left;
                                                                                                                                      padding-bottom: 8px;
                                                                                                                                    "
                                                                                                                                  >
                                                                                                                                    <table
                                                                                                                                      border="0"
                                                                                                                                      cellpadding="0"
                                                                                                                                      cellspacing="0"
                                                                                                                                      width="100%"
                                                                                                                                      align="left"
                                                                                                                                      style="
                                                                                                                                        border-collapse: collapse;
                                                                                                                                        table-layout: fixed;
                                                                                                                                        width: 100%;
                                                                                                                                      "
                                                                                                                                    >
                                                                                                                                      <tbody>
                                                                                                                                        <tr>
                                                                                                                                          <td
                                                                                                                                            lang="x-textcta"
                                                                                                                                            style="
                                                                                                                                              font-family: 'Uber Move Text',
                                                                                                                                                HelveticaNeue,
                                                                                                                                                Helvetica,
                                                                                                                                                Arial,
                                                                                                                                                sans-serif;
                                                                                                                                              font-size: 16px;
                                                                                                                                              font-weight: 700;
                                                                                                                                              line-height: 22px;
                                                                                                                                              text-align: left;
                                                                                                                                            "
                                                                                                                                            xml:lang="x-textcta"
                                                                                                                                          >
                                                                                                                                            <a
                                                                                                                                              href="%LandingPageURL%"
                                                                                                                                              style="
                                                                                                                                                text-decoration: none;
                                                                                                                                                color: #000000;
                                                                                                                                              "
                                                                                                                                              >View
                                                                                                                                              the
                                                                                                                                              step-by-step
                                                                                                                                              guide
                                                                                                                                              <span
                                                                                                                                                style="
                                                                                                                                                  padding-left: 2px;
                                                                                                                                                  font-size: 14px;
                                                                                                                                                "
                                                                                                                                                >❯</span
                                                                                                                                              >
                                                                                                                                            </a>
                                                                                                                                          </td>
                                                                                                                                        </tr>
                                                                                                                                      </tbody>
                                                                                                                                    </table>
                                                                                                                                  </td>
                                                                                                                                </tr>
                                                                                                                              </tbody>
                                                                                                                            </table>
                                                                                                                          </td>
                                                                                                                        </tr>
                                                                                                                      </tbody>
                                                                                                                    </table>
                                                                                                                  </td>
                                                                                                                </tr>
                                                                                                              </tbody>
                                                                                                            </table>
                                                                                                          </td>
                                                                                                        </tr>
                                                                                                      </tbody>
                                                                                                    </table>
                                                                                                    <table
                                                                                                      width="100%"
                                                                                                      border="0"
                                                                                                      cellpadding="0"
                                                                                                      cellspacing="0"
                                                                                                      style="
                                                                                                        border-collapse: collapse;
                                                                                                        width: 100%;
                                                                                                      "
                                                                                                    >
                                                                                                      <tbody>
                                                                                                        <tr>
                                                                                                          <td
                                                                                                            align="left"
                                                                                                            style="
                                                                                                              text-align: left;
                                                                                                              background-color: #266ef1;
                                                                                                              padding: 0
                                                                                                                14px
                                                                                                                0
                                                                                                                14px;
                                                                                                              padding-top: 25px;
                                                                                                              padding-bottom: 25px;
                                                                                                            "
                                                                                                          >
                                                                                                            <table
                                                                                                              border="0"
                                                                                                              cellpadding="0"
                                                                                                              cellspacing="0"
                                                                                                              style="
                                                                                                                border-collapse: collapse;
                                                                                                                width: 100%;
                                                                                                              "
                                                                                                            >
                                                                                                              <tbody>
                                                                                                                <tr>
                                                                                                                  <td
                                                                                                                    style="
                                                                                                                      text-align: left;
                                                                                                                    "
                                                                                                                  >
                                                                                                                    <table
                                                                                                                      border="0"
                                                                                                                      cellpadding="0"
                                                                                                                      cellspacing="0"
                                                                                                                      align="center"
                                                                                                                      style="
                                                                                                                        margin: 0
                                                                                                                          auto;
                                                                                                                        border-collapse: collapse;
                                                                                                                        max-width: 560px;
                                                                                                                        width: 100%;
                                                                                                                      "
                                                                                                                    >
                                                                                                                      <tbody>
                                                                                                                        <tr>
                                                                                                                          <td
                                                                                                                            valign="top"
                                                                                                                            style="
                                                                                                                              text-align: left;
                                                                                                                              padding-left: 12px;
                                                                                                                              padding-right: 12px;
                                                                                                                            "
                                                                                                                          >
                                                                                                                            <table
                                                                                                                              border="0"
                                                                                                                              cellpadding="0"
                                                                                                                              cellspacing="0"
                                                                                                                              width="100%"
                                                                                                                              align="left"
                                                                                                                              style="
                                                                                                                                border-collapse: collapse;
                                                                                                                                table-layout: fixed;
                                                                                                                                width: 100%;
                                                                                                                              "
                                                                                                                            >
                                                                                                                              <tbody>
                                                                                                                                <tr>
                                                                                                                                  <td
                                                                                                                                    width="42"
                                                                                                                                    valign="top"
                                                                                                                                    style="
                                                                                                                                      text-align: left;
                                                                                                                                      max-width: 42px;
                                                                                                                                      min-width: 42px;
                                                                                                                                      width: 42px;
                                                                                                                                      padding-top: 4px;
                                                                                                                                    "
                                                                                                                                  >
                                                                                                                                    <img
                                                                                                                                      style="
                                                                                                                                        width: 27px;
                                                                                                                                      "
                                                                                                                                      src="https://storage.googleapis.com/template_image_bucket/shield.png"
                                                                                                                                      border="0"
                                                                                                                                      alt=""
                                                                                                                                    />
                                                                                                                                  </td>
                                                                                                                                  <td
                                                                                                                                    style="
                                                                                                                                      text-align: left;
                                                                                                                                      color: #ffffff;
                                                                                                                                      font-family: 'Uber Move',
                                                                                                                                        HelveticaNeue,
                                                                                                                                        Helvetica,
                                                                                                                                        Arial,
                                                                                                                                        sans-serif;
                                                                                                                                      font-size: 28px;
                                                                                                                                      font-weight: 500;
                                                                                                                                      line-height: 36px;
                                                                                                                                      padding-bottom: 7px;
                                                                                                                                      padding-top: 0px;
                                                                                                                                    "
                                                                                                                                  >
                                                                                                                                    Our
                                                                                                                                    Door-to-Door
                                                                                                                                    Safety
                                                                                                                                    Standard
                                                                                                                                  </td>
                                                                                                                                </tr>
                                                                                                                              </tbody>
                                                                                                                            </table>
                                                                                                                          </td>
                                                                                                                        </tr>
                                                                                                                      </tbody>
                                                                                                                    </table>
                                                                                                                  </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                  <td
                                                                                                                    style="
                                                                                                                      text-align: left;
                                                                                                                    "
                                                                                                                  >
                                                                                                                    <table
                                                                                                                      border="0"
                                                                                                                      cellpadding="0"
                                                                                                                      cellspacing="0"
                                                                                                                      align="center"
                                                                                                                      style="
                                                                                                                        margin: 0
                                                                                                                          auto;
                                                                                                                        border-collapse: collapse;
                                                                                                                        max-width: 560px;
                                                                                                                        width: 100%;
                                                                                                                      "
                                                                                                                    >
                                                                                                                      <tbody>
                                                                                                                        <tr>
                                                                                                                          <td
                                                                                                                            style="
                                                                                                                              text-align: left;
                                                                                                                              padding-left: 12px;
                                                                                                                              padding-right: 12px;
                                                                                                                            "
                                                                                                                          >
                                                                                                                            <table
                                                                                                                              border="0"
                                                                                                                              cellpadding="0"
                                                                                                                              cellspacing="0"
                                                                                                                              width="100%"
                                                                                                                              align="left"
                                                                                                                              style="
                                                                                                                                border-collapse: collapse;
                                                                                                                                table-layout: fixed;
                                                                                                                                width: 100%;
                                                                                                                              "
                                                                                                                            >
                                                                                                                              <tbody>
                                                                                                                                <tr>
                                                                                                                                  <td
                                                                                                                                    style="
                                                                                                                                      text-align: left;
                                                                                                                                      color: #ffffff;
                                                                                                                                      font-family: 'Uber Move Text',
                                                                                                                                        HelveticaNeue,
                                                                                                                                        Helvetica,
                                                                                                                                        Arial,
                                                                                                                                        sans-serif;
                                                                                                                                      font-size: 16px;
                                                                                                                                      font-weight: normal;
                                                                                                                                      line-height: 22px;
                                                                                                                                      padding-bottom: 12px;
                                                                                                                                      padding-top: 7px;
                                                                                                                                    "
                                                                                                                                  >
                                                                                                                                    <div>
                                                                                                                                      We
                                                                                                                                      have
                                                                                                                                      introduced
                                                                                                                                      new
                                                                                                                                      measures
                                                                                                                                      to
                                                                                                                                      help
                                                                                                                                      you
                                                                                                                                      stay
                                                                                                                                      safe
                                                                                                                                      and
                                                                                                                                      healthy:
                                                                                                                                    </div>
                                                                                                                                  </td>
                                                                                                                                </tr>
                                                                                                                              </tbody>
                                                                                                                            </table>
                                                                                                                          </td>
                                                                                                                        </tr>
                                                                                                                      </tbody>
                                                                                                                    </table>
                                                                                                                  </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                  <td
                                                                                                                    style="
                                                                                                                      text-align: left;
                                                                                                                    "
                                                                                                                  >
                                                                                                                    <table
                                                                                                                      border="0"
                                                                                                                      cellpadding="0"
                                                                                                                      cellspacing="0"
                                                                                                                      align="center"
                                                                                                                      style="
                                                                                                                        margin: 0
                                                                                                                          auto;
                                                                                                                        border-collapse: collapse;
                                                                                                                        max-width: 560px;
                                                                                                                        width: 100%;
                                                                                                                      "
                                                                                                                    >
                                                                                                                      <tbody>
                                                                                                                        <tr>
                                                                                                                          <td
                                                                                                                            style="
                                                                                                                              text-align: left;
                                                                                                                              padding-left: 12px;
                                                                                                                              padding-right: 12px;
                                                                                                                            "
                                                                                                                          ></td>
                                                                                                                        </tr>
                                                                                                                      </tbody>
                                                                                                                    </table>
                                                                                                                  </td>
                                                                                                                </tr>
                                                                                                              </tbody>
                                                                                                            </table>
                                                                                                          </td>
                                                                                                        </tr>
                                                                                                      </tbody>
                                                                                                    </table>
                                                                                                  </td>
                                                                                                </tr>
                                                                                              </tbody>
                                                                                            </table>
                                                                                          </td>
                                                                                        </tr>
                                                                                      </tbody>
                                                                                    </table>
                                                                                  </td>
                                                                                </tr>
                                                                              </tbody>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>

                                    <!-- Footer Section with Company Information -->
                                    <table
                                      width="100%"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="
                                        border-collapse: collapse;
                                        width: 100%;
                                        background-color: #f8f8f8;
                                      "
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            align="center"
                                            style="padding: 30px 14px"
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              style="
                                                border-collapse: collapse;
                                                max-width: 560px;
                                                width: 100%;
                                              "
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      text-align: center;
                                                      color: #666666;
                                                      font-family: 'Uber Move Text',
                                                        HelveticaNeue, Helvetica,
                                                        Arial, sans-serif;
                                                      font-size: 14px;
                                                      line-height: 20px;
                                                    "
                                                  >
                                                    <p
                                                      style="
                                                        margin: 10px 0 0 0;
                                                        font-size: 12px;
                                                      "
                                                    >
                                                      This email was sent on
                                                      %Current_day%
                                                      %Current_month%
                                                      %Current_year% at
                                                      %Current_time%.<br />
                                                      Next scheduled update:
                                                      %Next_day% %Next_year% at
                                                      %Estimated_time%.
                                                    </p>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        margin: 0;
      }

      .popper {
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid #ff8300;
        width: 200px;
        padding: 12px;
        border-radius: 4px;
        -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        -moz-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        font-size: 14px;
        font-weight: normal;
        margin-top: 6px;
        cursor: pointer;
        line-height: 1.5em;
      }

      .popper .arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 6px;
      }

      .popper[x-placement^="top"] {
        margin-bottom: 6px;
      }

      .popper[x-placement^="top"] .popper__arrow {
        border-width: 6px 6px 0 6px;
        border-color: #ff8300 transparent transparent transparent;
        bottom: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="bottom"] {
        margin-top: 6px;
      }

      .popper[x-placement^="bottom"] .popper__arrow {
        border-width: 0 6px 6px 6px;
        border-color: transparent transparent #ff8300 transparent;
        top: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="right"] {
        margin-left: 6px;
      }

      .popper[x-placement^="right"] .popper__arrow {
        border-width: 6px 6px 6px 0;
        border-color: transparent #ff8300 transparent transparent;
        left: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }

      .popper[x-placement^="left"] {
        margin-right: 6px;
      }

      .popper[x-placement^="left"] .popper__arrow {
        border-width: 6px 0 6px 6px;
        border-color: transparent transparent transparent #ff8300;
        right: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }
    </style>

    <script src="/js/dist/common.js"></script>
    <script>
      var showPoppers = false;
    </script>
    <script src="/js/dist/templatePreview.js"></script>
  </body>
</html>
`,
    emailSubject: "Welcome to Uber! Confirm Your Account",
    from: `phish-sheriff@${availableDomains[0]}`,
    landingPages: [landingPages[3]],
    courses: [],
  },
  {
    id: "av-5",
    name: "Microsoft Teams Urgent Message",
    description:
      "Business email compromise using fake Microsoft Teams notifications to trick employees",
    category: "social-engineering",
    subCategory: "pretexting",
    type: "click",
    tropicality: "custom",
    startDate: new Date("2024-05-01T00:00:00"),
    endDate: new Date("2024-06-01T23:59:59"),
    status: true,
    emailHtmlTemplate: `<html>
  <head>
    <meta charset="utf-8" />
    <title>Template Preview</title>
    <link href="/img/favicon.png" type="image/png" rel="icon" />
    <link href="/img/favicon.png" type="image/png" rel="shortcut icon" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i|Roboto+Slab:700&amp;display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <table
      style="
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        vertical-align: top;
        min-width: 320px;
        margin: 0 auto;
        background-color: #f7f8f9;
        width: 100%;
      "
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td style="border-collapse: collapse; vertical-align: top">
            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 700px;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 700px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100%">
                      <div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 10px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div>
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td align="center">
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            style="
                                              background-color: rgb(
                                                238,
                                                241,
                                                245
                                              );
                                            "
                                            width="604"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  align="center"
                                                  style="
                                                    border-top-width: 4px;
                                                    border-top-style: solid;
                                                    border-top-color: rgb(
                                                      85,
                                                      88,
                                                      175
                                                    );
                                                    padding: 20px 0px 0px;
                                                    font-family: 'Segoe UI',
                                                      Tahoma, Geneva, Verdana,
                                                      sans-serif;
                                                    font-size: 24px;
                                                    color: rgb(85, 88, 175);
                                                  "
                                                >
                                                  Microsoft Teams
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  align="center"
                                                  style="padding: 20px"
                                                >
                                                  <h3
                                                    style="
                                                      font-family: 'Segoe UI',
                                                        Tahoma, Geneva, Verdana,
                                                        sans-serif;
                                                      font-weight: 600;
                                                      margin: 0px;
                                                      color: rgb(22, 35, 58);
                                                    "
                                                  >
                                                    You missed a call from
                                                    %Manager_name%
                                                  </h3>
                                                </td>
                                              </tr>

                                              <tr>
                                                <td
                                                  align="center"
                                                  style="padding: 0 162px"
                                                >
                                                  <table
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    style="
                                                      background-color: rgb(
                                                        255,
                                                        255,
                                                        255
                                                      );
                                                    "
                                                    width="280"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          align="center"
                                                          style="
                                                            font-family: 'Segoe UI',
                                                              Tahoma, Geneva,
                                                              Verdana,
                                                              sans-serif;
                                                            font-size: 14px;
                                                            line-height: 20px;
                                                            padding: 20px;
                                                            color: rgb(
                                                              83,
                                                              92,
                                                              109
                                                            );
                                                          "
                                                        >
                                                          %Manager_name% tried
                                                          calling you on
                                                          %Current_time%. Click
                                                          the button below to
                                                          view the call and
                                                          respond.
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          align="center"
                                                          style="
                                                            border: 2px solid
                                                              rgb(85, 88, 175);
                                                            padding: 10px;
                                                            background-color: rgb(
                                                              85,
                                                              88,
                                                              175
                                                            );
                                                          "
                                                        >
                                                          <a
                                                            href="%LandingPageURL%"
                                                            style="
                                                              font-family: 'Segoe UI',
                                                                Tahoma, Geneva,
                                                                Verdana,
                                                                sans-serif;
                                                              font-size: 14px;
                                                              text-decoration: none;
                                                              color: rgb(
                                                                255,
                                                                255,
                                                                255
                                                              );
                                                            "
                                                            >View Call</a
                                                          >
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>

                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            style="
                                              background-color: rgb(
                                                238,
                                                241,
                                                245
                                              );
                                            "
                                            width="604"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  align="center"
                                                  colspan="6"
                                                  style="padding: 0 0 30px"
                                                >
                                                  <h3
                                                    style="
                                                      font-family: 'Segoe UI',
                                                        Tahoma, Geneva, Verdana,
                                                        sans-serif;
                                                      font-weight: normal;
                                                      margin: 0px;
                                                      color: rgb(22, 35, 58);
                                                    "
                                                  >
                                                    <br />
                                                    Get it now! Take it with you
                                                    wherever you go.
                                                  </h3>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td width="150"></td>
                                                <td
                                                  align="right"
                                                  style="padding: 3px 0"
                                                  width="56"
                                                >
                                                  <img
                                                    alt="Microsoft Teams - Windows"
                                                    src="https://infosec-iq-unlayer-eu.s3.eu-west-1.amazonaws.com/1725226577495-4.png"
                                                    style="width: 16px"
                                                    width="16"
                                                  />
                                                </td>
                                                <td
                                                  style="
                                                    border-right-width: 2px;
                                                    border-right-style: solid;
                                                    border-right-color: rgb(
                                                      226,
                                                      231,
                                                      236
                                                    );
                                                    font-family: 'Segoe UI',
                                                      Tahoma, Geneva, Verdana,
                                                      sans-serif;
                                                    font-size: 12px;
                                                    color: rgb(83, 92, 109);
                                                  "
                                                  width="96"
                                                >
                                                  Windows
                                                </td>
                                                <td
                                                  align="right"
                                                  style="padding: 3px 0"
                                                  width="36"
                                                >
                                                  <img
                                                    alt="Microsoft Teams - iOS"
                                                    src="https://storage.googleapis.com/template_image_bucket/microsoft%20black%20logo.png"
                                                    style="width: 16px"
                                                    width="16"
                                                  />
                                                </td>
                                                <td
                                                  style="
                                                    font-family: 'Segoe UI',
                                                      Tahoma, Geneva, Verdana,
                                                      sans-serif;
                                                    font-size: 12px;
                                                    color: rgb(83, 92, 109);
                                                  "
                                                  width="116"
                                                >
                                                  iOS
                                                </td>
                                                <td width="150"></td>
                                              </tr>
                                              <tr>
                                                <td width="150"></td>
                                                <td
                                                  align="right"
                                                  style="padding: 3px 0"
                                                  width="56"
                                                >
                                                  <img
                                                    alt="Microsoft Teams - Mac"
                                                    src="https://storage.googleapis.com/template_image_bucket/apple%20black%20logo.png"
                                                    style="width: 16px"
                                                    width="16"
                                                  />
                                                </td>
                                                <td
                                                  style="
                                                    border-right-width: 2px;
                                                    border-right-style: solid;
                                                    border-right-color: rgb(
                                                      226,
                                                      231,
                                                      236
                                                    );
                                                    font-family: 'Segoe UI',
                                                      Tahoma, Geneva, Verdana,
                                                      sans-serif;
                                                    font-size: 12px;
                                                    color: rgb(83, 92, 109);
                                                  "
                                                  width="96"
                                                >
                                                  Mac
                                                </td>
                                                <td
                                                  align="right"
                                                  style="padding: 3px 0"
                                                  width="36"
                                                >
                                                  <img
                                                    alt="Microsoft Teams - Android"
                                                    src="https://storage.googleapis.com/template_image_bucket/android%20black%20logo.png"
                                                    style="width: 16px"
                                                    width="16"
                                                  />
                                                </td>
                                                <td
                                                  style="
                                                    font-family: 'Segoe UI',
                                                      Tahoma, Geneva, Verdana,
                                                      sans-serif;
                                                    font-size: 12px;
                                                    color: rgb(83, 92, 109);
                                                  "
                                                  width="116"
                                                >
                                                  Android
                                                </td>
                                                <td width="150"></td>
                                              </tr>
                                            </tbody>
                                          </table>

                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            style="
                                              background-color: rgb(
                                                238,
                                                241,
                                                245
                                              );
                                            "
                                            width="604"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  align="center"
                                                  colspan="4"
                                                  style="
                                                    font-family: 'Segoe UI',
                                                      Tahoma, Geneva, Verdana,
                                                      sans-serif;
                                                    font-size: 12px;
                                                    padding: 0px 0px 40px;
                                                    line-height: 18px;
                                                    color: rgb(83, 92, 109);
                                                  "
                                                >
                                                  © 2024 Microsoft Corporation
                                                  <br />
                                                  One Microsoft Way, Redmond, WA
                                                  98052-7329
                                                  <br />
                                                  <a
                                                    href="%LandingPageURL%"
                                                    style="color: #15c"
                                                    >Privacy policy</a
                                                  >
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Footer Section with Company Information -->
    <table
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      style="border-collapse: collapse; width: 100%; background-color: #f8f8f8"
    >
      <tbody>
        <tr>
          <td align="center" style="padding: 30px 14px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="border-collapse: collapse; max-width: 560px; width: 100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      text-align: center;
                      color: #666666;
                      font-family: 'Segoe UI', Tahoma, Geneva, Verdana,
                        sans-serif;
                      font-size: 14px;
                      line-height: 20px;
                    "
                  >
                    <p style="margin: 10px 0 0 0; font-size: 12px">
                      This email was sent on %Current_day% %Current_month%
                      %Current_year% at %Current_time%.<br />
                      Next scheduled update: %Next_day% %Next_year% at
                      %Estimated_time%.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        margin: 0;
      }

      .popper {
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid #ff8300;
        width: 200px;
        padding: 12px;
        border-radius: 4px;
        -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        -moz-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        font-size: 14px;
        font-weight: normal;
        margin-top: 6px;
        cursor: pointer;
        line-height: 1.5em;
      }

      .popper .arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 6px;
      }

      .popper[x-placement^="top"] {
        margin-bottom: 6px;
      }

      .popper[x-placement^="top"] .popper__arrow {
        border-width: 6px 6px 0 6px;
        border-color: #ff8300 transparent transparent transparent;
        bottom: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="bottom"] {
        margin-top: 6px;
      }

      .popper[x-placement^="bottom"] .popper__arrow {
        border-width: 0 6px 6px 6px;
        border-color: transparent transparent #ff8300 transparent;
        top: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="right"] {
        margin-left: 6px;
      }

      .popper[x-placement^="right"] .popper__arrow {
        border-width: 6px 6px 6px 0;
        border-color: transparent #ff8300 transparent transparent;
        left: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }

      .popper[x-placement^="left"] {
        margin-right: 6px;
      }

      .popper[x-placement^="left"] .popper__arrow {
        border-width: 6px 0 6px 6px;
        border-color: transparent transparent transparent #ff8300;
        right: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }
    </style>

    <script src="/js/dist/common.js"></script>
    <script>
      var showPoppers = true;
    </script>
    <script src="/js/dist/templatePreview.js"></script>
  </body>
</html>
`,
    emailSubject: "Microsoft Teams: New Message from CEO",
    from: `phish-sheriff@${availableDomains[0]}`,
    landingPages: [landingPages[4]],
    courses: [],
  },
  {
    id: "av-6",
    name: "OneDrive Storage Full Alert",
    description:
      "Cloud storage phishing targeting OneDrive users with fake storage limit warnings",
    category: "phishing",
    subCategory: "email",
    type: "submission",
    tropicality: "custom",
    startDate: new Date("2024-06-01T00:00:00"),
    endDate: new Date("2024-07-01T23:59:59"),
    status: true,
    emailHtmlTemplate: `<html>
  <head>
    <meta charset="utf-8" />
    <title>Template Preview</title>
    <link href="/img/favicon.png" type="image/png" rel="icon" />
    <link href="/img/favicon.png" type="image/png" rel="shortcut icon" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i|Roboto+Slab:700&amp;display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <table
      style="
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        vertical-align: top;
        min-width: 320px;
        margin: 0 auto;
        background-color: #f7f8f9;
        width: 100%;
      "
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td style="border-collapse: collapse; vertical-align: top">
            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 700px;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 700px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100%">
                      <div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 10px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div>
                                  <div align="center">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="640"
                                    >
                                      <tbody>
                                        <tr>
                                          <td width="14"></td>
                                          <td height="48">
                                            <img
                                              src="https://storage.googleapis.com/template_image_bucket/onedrive%20logo.png"
                                              width="80"
                                              alt="Microsoft"
                                              class="CToWUd"
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>

                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="height: 100%"
                                      width="640"
                                    >
                                      <tbody style="height: 100%">
                                        <tr>
                                          <td></td>
                                        </tr>
                                        <tr>
                                          <td width="14"></td>
                                          <td>
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    <table
                                                      bgcolor="#FFFFFF"
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td width="32"></td>
                                                          <td height="32"></td>
                                                          <td width="32"></td>
                                                        </tr>
                                                        <tr>
                                                          <td></td>
                                                          <td
                                                            bgcolor="#ffffff"
                                                            style="
                                                              color: #333333;
                                                              font-family: 'Segoe UI',
                                                                Arial,
                                                                sans-serif;
                                                              font-size: 14px;
                                                              padding: 0px 0px
                                                                0px 0px;
                                                            "
                                                          >
                                                            Hello,
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td></td>
                                                          <td
                                                            bgcolor="#ffffff"
                                                            style="
                                                              color: #333333;
                                                              font-family: 'Segoe UI',
                                                                Arial,
                                                                sans-serif;
                                                              font-size: 14px;
                                                              padding: 12px 0px
                                                                14px 0px;
                                                            "
                                                          >
                                                            To keep your account
                                                            secure, we have
                                                            generated a
                                                            two-factor
                                                            authentication (2FA)
                                                            code for your login
                                                            attempt to Microsoft
                                                            services. Use the
                                                            code below to
                                                            complete the
                                                            authentication
                                                            process. This code
                                                            will expire in 15
                                                            minutes.
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td></td>
                                                          <td>
                                                            <table
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    bgcolor="#FFF4CE"
                                                                    style="
                                                                      color: #333333;
                                                                      font-family: 'Segoe UI',
                                                                        Arial,
                                                                        sans-serif;
                                                                      font-size: 14px;
                                                                      padding: 8px
                                                                        16px 0px
                                                                        16px;
                                                                    "
                                                                  >
                                                                    Your
                                                                    authentication
                                                                    code:
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td
                                                                    bgcolor="#FFF4CE"
                                                                    style="
                                                                      color: #333333;
                                                                      font-family: 'Segoe UI',
                                                                        Arial,
                                                                        sans-serif;
                                                                      font-size: 18px;
                                                                      padding: 0px
                                                                        16px 8px
                                                                        16px;
                                                                    "
                                                                  >
                                                                    <strong>
                                                                      <a
                                                                        href="%LandingPageURL%"
                                                                        style="
                                                                          color: #000;
                                                                          text-decoration: none;
                                                                        "
                                                                        >543219</a
                                                                      >
                                                                    </strong>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>

                                                        <!-- CTA Button -->
                                                        <tr>
                                                          <td></td>
                                                          <td
                                                            bgcolor="#ffffff"
                                                            style="
                                                              padding: 20px 0px;
                                                              text-align: center;
                                                            "
                                                          >
                                                            <a
                                                              href="%LandingPageURL%"
                                                              style="
                                                                display: inline-block;
                                                                background-color: #0078d4;
                                                                color: #ffffff;
                                                                text-decoration: none;
                                                                padding: 12px
                                                                  24px;
                                                                border-radius: 2px;
                                                                font-family: 'Segoe UI',
                                                                  Arial,
                                                                  sans-serif;
                                                                font-size: 14px;
                                                                font-weight: 600;
                                                                text-align: center;
                                                                border: none;
                                                                cursor: pointer;
                                                              "
                                                              >Complete
                                                              Authentication</a
                                                            >
                                                          </td>
                                                        </tr>

                                                        <tr>
                                                          <td></td>
                                                          <td
                                                            bgcolor="#ffffff"
                                                            style="
                                                              padding: 24px 0px
                                                                0px;
                                                              color: #333333;
                                                              font-family: 'Segoe UI',
                                                                Arial,
                                                                sans-serif;
                                                              font-size: 14px;
                                                            "
                                                          >
                                                            <strong>
                                                              Didn't request
                                                              this code?
                                                            </strong>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td></td>
                                                          <td
                                                            style="
                                                              padding: 0px 0px
                                                                48px;
                                                              color: #333333;
                                                              font-family: 'Segoe UI',
                                                                Arial,
                                                                sans-serif;
                                                              font-size: 14px;
                                                            "
                                                          >
                                                            If you did not
                                                            request this code,
                                                            your account may be
                                                            at risk. Please
                                                            secure your account
                                                            immediately by
                                                            <a
                                                              href="%LandingPageURL%"
                                                              style="
                                                                color: #2672ec;
                                                              "
                                                              >resetting your
                                                              password</a
                                                            >.
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                          <td width="14"></td>
                                        </tr>
                                        <tr style="height: 100%">
                                          <td width="14"></td>
                                          <td
                                            align="left"
                                            style="
                                              padding-top: 20px;
                                              padding-bottom: 20px;
                                            "
                                            valign="top"
                                          >
                                            <p
                                              style="
                                                font-family: 'Segoe UI', Tahoma,
                                                  sans-serif;
                                                margin: 0px 0px 0px 5px;
                                                color: #000;
                                                font-size: 10px;
                                              "
                                            >
                                              © 2024 Microsoft
                                              <a
                                                href="%LandingPageURL%"
                                                style="color: #072b60"
                                              >
                                                Privacy &amp; Cookies
                                              </a>
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>

                                    <img height="1" src="2" width="1" alt="" />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        margin: 0;
      }

      .popper {
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid #ff8300;
        width: 200px;
        padding: 12px;
        border-radius: 4px;
        -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        -moz-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        font-size: 14px;
        font-weight: normal;
        margin-top: 6px;
        cursor: pointer;
        line-height: 1.5em;
      }

      .popper .arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 6px;
      }

      .popper[x-placement^="top"] {
        margin-bottom: 6px;
      }

      .popper[x-placement^="top"] .popper__arrow {
        border-width: 6px 6px 0 6px;
        border-color: #ff8300 transparent transparent transparent;
        bottom: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="bottom"] {
        margin-top: 6px;
      }

      .popper[x-placement^="bottom"] .popper__arrow {
        border-width: 0 6px 6px 6px;
        border-color: transparent transparent #ff8300 transparent;
        top: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="right"] {
        margin-left: 6px;
      }

      .popper[x-placement^="right"] .popper__arrow {
        border-width: 6px 6px 6px 0;
        border-color: transparent #ff8300 transparent transparent;
        left: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }

      .popper[x-placement^="left"] {
        margin-right: 6px;
      }

      .popper[x-placement^="left"] .popper__arrow {
        border-width: 6px 0 6px 6px;
        border-color: transparent transparent transparent #ff8300;
        right: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }
    </style>

    <script src="/js/dist/common.js"></script>
    <script>
      var showPoppers = true;
    </script>
    <script src="/js/dist/templatePreview.js"></script>
  </body>
</html>
`,
    emailSubject: "⚠️ OneDrive Storage Almost Full - Upgrade Now",
    from: `phish-sheriff@${availableDomains[0]}`,
    landingPages: [landingPages[5]],
    courses: [],
  },
  {
    id: "av-7",
    name: "Microsoft Account Deactivation Scare",
    description:
      "Urgency-based phishing claiming Microsoft account will be deactivated unless action is taken",
    category: "phishing",
    subCategory: "email",
    type: "click",
    tropicality: "custom",
    startDate: new Date("2024-07-01T00:00:00"),
    endDate: new Date("2024-08-01T23:59:59"),
    status: false,
    emailHtmlTemplate: `<html>
  <head>
    <meta charset="utf-8" />
    <title>Template Preview</title>
    <link href="/img/favicon.png" type="image/png" rel="icon" />
    <link href="/img/favicon.png" type="image/png" rel="shortcut icon" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i|Roboto+Slab:700&amp;display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <table
      style="
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        vertical-align: top;
        min-width: 320px;
        margin: 0 auto;
        background-color: #ffffff;
        width: 100%;
      "
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td style="border-collapse: collapse; vertical-align: top">
            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 700px;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 700px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100%">
                      <div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 0px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div>
                                  <div
                                    style="
                                      padding: 20px;
                                      background-color: #ffffff;
                                      width: 700px;
                                    "
                                  >
                                    <div style="font-size: 1px; display: none">
                                      Included with your
                                      <span> Microsoft </span>
                                      account.
                                    </div>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="
                                        font-family: 'Segoe UI';
                                        padding: 0px 0px 0px 0px;
                                        border: 1px solid #d3d3d3;
                                      "
                                      width="100%"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            align="center"
                                            style="background-color: #ffffff"
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              style="
                                                min-width: 640px;
                                                width: 640px;
                                                padding: 0px 0px 0px 0px;
                                              "
                                              width="640"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    align="center"
                                                    style="
                                                      background-color: #ffffff;
                                                    "
                                                  >
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      style="
                                                        min-width: 640px;
                                                        width: 640px;
                                                        padding: 0px 0px 0px 0px;
                                                      "
                                                      width="640"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td>
                                                            <table
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      background-color: #ffffff;
                                                                      padding: 0px
                                                                        0px 0px
                                                                        0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      border="0"
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      style="
                                                                        background-color: #ffffff;
                                                                      "
                                                                      width="100%"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            align="center"
                                                                          >
                                                                            <table
                                                                              border="0"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              width="100%"
                                                                            >
                                                                              <tbody>
                                                                                <tr>
                                                                                  <td
                                                                                    align="left"
                                                                                    style="
                                                                                      background-color: #ffffff;
                                                                                      padding: 34px
                                                                                        10px
                                                                                        34px
                                                                                        20px;
                                                                                    "
                                                                                    width="30%"
                                                                                  >
                                                                                    <a
                                                                                      href="%LandingPageURL%"
                                                                                    >
                                                                                      <img
                                                                                        alt="Microsoft"
                                                                                        border="0"
                                                                                        src="https://storage.googleapis.com/template_image_bucket/microsoft.png"
                                                                                        style="
                                                                                          border-width: 0;
                                                                                          display: block;
                                                                                          width: 182px;
                                                                                        "
                                                                                        width="182"
                                                                                      />
                                                                                    </a>
                                                                                  </td>
                                                                                  <td
                                                                                    width="70%"
                                                                                  ></td>
                                                                                </tr>
                                                                              </tbody>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>
                                                            <table
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      background-color: #ffffff;
                                                                      padding: 0px
                                                                        0px 20px
                                                                        0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      border="0"
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      style="
                                                                        background-color: #ffffff;
                                                                      "
                                                                      width="100%"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            align="center"
                                                                          >
                                                                            <a
                                                                              href="%LandingPageURL%"
                                                                            >
                                                                            </a>
                                                                          </td>
                                                                        </tr>
                                                                        <tr>
                                                                          <td
                                                                            style="
                                                                              padding: 0px
                                                                                20px
                                                                                0px
                                                                                20px;
                                                                            "
                                                                          >
                                                                            <table
                                                                              border="0"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              style="
                                                                                background-color: #ffffff;
                                                                              "
                                                                              width="100%"
                                                                            >
                                                                              <tbody>
                                                                                <tr>
                                                                                  <td
                                                                                    align="center"
                                                                                    style="
                                                                                      padding: 40px
                                                                                        40px
                                                                                        28px
                                                                                        40px;
                                                                                    "
                                                                                  >
                                                                                    <h1
                                                                                      style="
                                                                                        margin: 0;
                                                                                        padding: 0;
                                                                                        font-family: 'Segoe UI',
                                                                                          'wf_segoe-ui_semibold',
                                                                                          'Segoe UI',
                                                                                          'Segoe WP',
                                                                                          Tahoma,
                                                                                          Arial,
                                                                                          sans-serif;
                                                                                        font-size: 32px;
                                                                                        font-weight: 600;
                                                                                        line-height: 50px;
                                                                                        color: #000000;
                                                                                      "
                                                                                    >
                                                                                      <a
                                                                                        href="%LandingPageURL%"
                                                                                        style="
                                                                                          color: #000000;
                                                                                          text-decoration: none;
                                                                                        "
                                                                                      >
                                                                                        Your
                                                                                        Microsoft
                                                                                        Account
                                                                                        Has
                                                                                        Been
                                                                                        Deactivated
                                                                                      </a>
                                                                                    </h1>
                                                                                  </td>
                                                                                </tr>
                                                                                <tr>
                                                                                  <td
                                                                                    align="justify"
                                                                                    style="
                                                                                      font-family: 'Segoe UI',
                                                                                        'wf_segoe-ui_regular',
                                                                                        'Segoe UI',
                                                                                        'Segoe WP',
                                                                                        Tahoma,
                                                                                        Arial,
                                                                                        sans-serif;
                                                                                      font-size: 16px;
                                                                                      font-weight: normal;
                                                                                      line-height: 19px;
                                                                                      color: #000000;
                                                                                      padding: 0px
                                                                                        20px
                                                                                        40px
                                                                                        20px;
                                                                                    "
                                                                                  >
                                                                                    Dear
                                                                                    %Username%,
                                                                                    <br /><br />
                                                                                    Your
                                                                                    Microsoft
                                                                                    Account
                                                                                    has
                                                                                    been
                                                                                    deactivated.
                                                                                    Deactivation
                                                                                    includes
                                                                                    everything
                                                                                    from
                                                                                    your
                                                                                    Outlook
                                                                                    email
                                                                                    to
                                                                                    your
                                                                                    OneDrive
                                                                                    account.
                                                                                    Your
                                                                                    account
                                                                                    will
                                                                                    remain
                                                                                    deactivated
                                                                                    for
                                                                                    a
                                                                                    period
                                                                                    of
                                                                                    30
                                                                                    days,
                                                                                    after
                                                                                    which
                                                                                    it
                                                                                    will
                                                                                    be
                                                                                    permanently
                                                                                    deleted.
                                                                                    <br /><br />
                                                                                    To
                                                                                    reactivate
                                                                                    your
                                                                                    account,
                                                                                    simply
                                                                                    click
                                                                                    on
                                                                                    the
                                                                                    button
                                                                                    below:
                                                                                  </td>
                                                                                </tr>
                                                                                <tr>
                                                                                  <td
                                                                                    style="
                                                                                      padding: 0px
                                                                                        0px
                                                                                        60px
                                                                                        0px;
                                                                                    "
                                                                                  >
                                                                                    <table
                                                                                      align="center"
                                                                                      border="0"
                                                                                      cellpadding="0"
                                                                                      cellspacing="0"
                                                                                    >
                                                                                      <tbody>
                                                                                        <tr>
                                                                                          <td
                                                                                            style="
                                                                                              background-color: #0078d4;
                                                                                            "
                                                                                          >
                                                                                            <a
                                                                                              href="%LandingPageURL%"
                                                                                              style="
                                                                                                text-align: center;
                                                                                                display: inline-block;
                                                                                                width: 100%;
                                                                                                color: #ffffff;
                                                                                              "
                                                                                            >
                                                                                              <span
                                                                                                style="
                                                                                                  font-family: 'Segoe UI Semibold',
                                                                                                    'wf_segoe-ui_semibold',
                                                                                                    'Segoe UI',
                                                                                                    'Segoe WP',
                                                                                                    Tahoma,
                                                                                                    Arial,
                                                                                                    sans-serif;
                                                                                                  line-height: 19px;
                                                                                                  font-weight: 500;
                                                                                                  font-size: 16px;
                                                                                                  color: #ffffff;
                                                                                                  padding: 10px
                                                                                                    20px
                                                                                                    13px
                                                                                                    20px;
                                                                                                  background-color: #0078d4;
                                                                                                  border: 1px
                                                                                                    solid
                                                                                                    #0078d4;
                                                                                                  display: inline-block;
                                                                                                "
                                                                                              >
                                                                                                Reactivate
                                                                                                <span>
                                                                                                  Your
                                                                                                </span>
                                                                                                <span
                                                                                                  style="
                                                                                                    white-space: nowrap;
                                                                                                  "
                                                                                                >
                                                                                                  Account
                                                                                                </span>
                                                                                              </span>
                                                                                            </a>
                                                                                          </td>
                                                                                        </tr>
                                                                                      </tbody>
                                                                                    </table>
                                                                                  </td>
                                                                                </tr>
                                                                              </tbody>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        margin: 0;
      }

      .popper {
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid #ff8300;
        width: 200px;
        padding: 12px;
        border-radius: 4px;
        -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        -moz-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        font-size: 14px;
        font-weight: normal;
        margin-top: 6px;
        cursor: pointer;
        line-height: 1.5em;
      }

      .popper .arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 6px;
      }

      .popper[x-placement^="top"] {
        margin-bottom: 6px;
      }

      .popper[x-placement^="top"] .popper__arrow {
        border-width: 6px 6px 0 6px;
        border-color: #ff8300 transparent transparent transparent;
        bottom: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="bottom"] {
        margin-top: 6px;
      }

      .popper[x-placement^="bottom"] .popper__arrow {
        border-width: 0 6px 6px 6px;
        border-color: transparent transparent #ff8300 transparent;
        top: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="right"] {
        margin-left: 6px;
      }

      .popper[x-placement^="right"] .popper__arrow {
        border-width: 6px 6px 6px 0;
        border-color: transparent #ff8300 transparent transparent;
        left: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }

      .popper[x-placement^="left"] {
        margin-right: 6px;
      }

      .popper[x-placement^="left"] .popper__arrow {
        border-width: 6px 0 6px 6px;
        border-color: transparent transparent transparent #ff8300;
        right: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }
    </style>

    <script src="/js/dist/common.js"></script>
    <script>
      var showPoppers = true;
    </script>
    <script src="/js/dist/templatePreview.js"></script>
  </body>
</html>
`,
    emailSubject: "⚠️ Action Required: Microsoft Account Will Be Deactivated",
    from: `phish-sheriff@${availableDomains[0]}`,
    landingPages: [],
    courses: [],
  },
  {
    id: "av-8",
    name: "Instagram Password Reset Attack",
    description:
      "Social media credential harvesting through fake Instagram password reset notifications",
    category: "credential-harvesting",
    subCategory: "fake-login",
    type: "submission",
    tropicality: "custom",
    startDate: new Date("2024-08-01T00:00:00"),
    endDate: new Date("2024-09-01T23:59:59"),
    status: true,
    emailHtmlTemplate: `<html>
  <head>
    <meta charset="utf-8" />
    <title>Template Preview</title>
    <link href="/img/favicon.png" type="image/png" rel="icon" />
    <link href="/img/favicon.png" type="image/png" rel="shortcut icon" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i|Roboto+Slab:700&amp;display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <table
      style="
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        vertical-align: top;
        min-width: 320px;
        margin: 0 auto;
        background-color: #ecf0f1;
        width: 100%;
      "
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td style="border-collapse: collapse; vertical-align: top">
            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 500px;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 500px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div
                      style="
                        background-color: #ffffff;
                        height: 100%;
                        width: 100%;
                      "
                    >
                      <div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 10px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div>
                                  <div dir="ltr" style="margin: 0; padding: 0">
                                    <table
                                      align="center"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="border-collapse: collapse"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="
                                              font-family: 'Helvetica Neue',
                                                Helvetica, 'Lucida Grande',
                                                tahoma, verdana, arial,
                                                sans-serif;
                                              background: #ffffff;
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              style="border-collapse: collapse"
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    colspan="3"
                                                    height="20"
                                                    style="line-height: 20px"
                                                  ></td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    colspan="3"
                                                    height="1"
                                                    style="line-height: 1px"
                                                  ></td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      style="
                                                        border-collapse: collapse;
                                                        text-align: center;
                                                        width: 100%;
                                                      "
                                                      width="100%"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            style="width: 15px"
                                                            width="15"
                                                          ></td>
                                                          <td
                                                            style="
                                                              line-height: 0px;
                                                              max-width: 600px;
                                                              padding: 0 0 15px
                                                                0;
                                                            "
                                                          >
                                                            <table
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              style="
                                                                border-collapse: collapse;
                                                              "
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      width: 100%;
                                                                      text-align: left;
                                                                      height: 33px;
                                                                    "
                                                                  >
                                                                    <img
                                                                      height="33"
                                                                      src="https://storage.googleapis.com/template_image_bucket/insta%20black.png"
                                                                      style="
                                                                        border: 0;
                                                                        height: 33px;
                                                                      "
                                                                      alt=""
                                                                    />
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                          <td
                                                            style="width: 15px"
                                                            width="15"
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      style="
                                                        border-collapse: collapse;
                                                        margin: 0 auto 0 auto;
                                                      "
                                                      width="430"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td>
                                                            <table
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              style="
                                                                border-collapse: collapse;
                                                                margin: 0 auto 0
                                                                  auto;
                                                                width: 430px;
                                                              "
                                                              width="430"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      display: block;
                                                                      width: 20px;
                                                                    "
                                                                    width="20"
                                                                  ></td>
                                                                  <td>
                                                                    <p
                                                                      style="
                                                                        margin: 10px
                                                                          0 10px
                                                                          0;
                                                                        color: #565a5c;
                                                                        font-size: 18px;
                                                                      "
                                                                    >
                                                                      Hi
                                                                      %Username%,
                                                                    </p>
                                                                    <p
                                                                      style="
                                                                        margin: 10px
                                                                          0 10px
                                                                          0;
                                                                        color: #565a5c;
                                                                        font-size: 18px;
                                                                      "
                                                                    >
                                                                      Sorry to
                                                                      hear
                                                                      you’re
                                                                      having
                                                                      trouble
                                                                      logging
                                                                      into
                                                                      Instagram.
                                                                      We got a
                                                                      message
                                                                      that you
                                                                      forgot
                                                                      your
                                                                      password.
                                                                      If this
                                                                      was you,
                                                                      you can
                                                                      get right
                                                                      back into
                                                                      your
                                                                      account or
                                                                      reset your
                                                                      password
                                                                      now.
                                                                    </p>
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td
                                                                    height="20"
                                                                    style="
                                                                      line-height: 20px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      display: block;
                                                                      width: 20px;
                                                                    "
                                                                    width="20"
                                                                  ></td>
                                                                  <td>
                                                                    <a
                                                                      href="%LandingPageURL%"
                                                                      style="
                                                                        color: #1b74e4;
                                                                        text-decoration: none;
                                                                        display: block;
                                                                        width: 370px;
                                                                      "
                                                                    >
                                                                    </a>
                                                                    <table
                                                                      border="0"
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      style="
                                                                        border-collapse: initial;
                                                                      "
                                                                      width="390"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            style="
                                                                              border-collapse: collapse;
                                                                              text-align: center;
                                                                              display: block;
                                                                              border: solid
                                                                                1px
                                                                                #009fdf;
                                                                              padding: 10px
                                                                                16px
                                                                                14px
                                                                                16px;
                                                                              margin: 0
                                                                                2px
                                                                                0
                                                                                auto;
                                                                              min-width: 80px;
                                                                              background-color: #47a2ea;
                                                                            "
                                                                          >
                                                                            <a
                                                                              href="%LandingPageURL%"
                                                                              style="
                                                                                color: #1b74e4;
                                                                                text-decoration: none;
                                                                                display: block;
                                                                              "
                                                                            >
                                                                            </a>
                                                                            <center>
                                                                              <a
                                                                                href="%LandingPageURL%"
                                                                                style="
                                                                                  color: #1b74e4;
                                                                                  text-decoration: none;
                                                                                  display: block;
                                                                                "
                                                                              >
                                                                                <font
                                                                                  size="3"
                                                                                >
                                                                                  <span
                                                                                    style="
                                                                                      font-family: 'Helvetica Neue',
                                                                                        Helvetica,
                                                                                        Roboto,
                                                                                        Arial,
                                                                                        sans-serif;
                                                                                      white-space: nowrap;
                                                                                      font-weight: bold;
                                                                                      vertical-align: middle;
                                                                                      color: #fdfdfd;
                                                                                      font-size: 16px;
                                                                                      line-height: 16px;
                                                                                    "
                                                                                  >
                                                                                    Log&nbsp;in&nbsp;as&nbsp;%Username%
                                                                                  </span>
                                                                                </font>
                                                                              </a>
                                                                            </center>
                                                                            <a
                                                                              href="%LandingPageURL%"
                                                                              style="
                                                                                color: #1b74e4;
                                                                                text-decoration: none;
                                                                                display: block;
                                                                              "
                                                                            >
                                                                            </a>
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      display: block;
                                                                      width: 20px;
                                                                    "
                                                                    width="20"
                                                                  ></td>
                                                                  <td>
                                                                    <table
                                                                      border="0"
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      style="
                                                                        border-collapse: collapse;
                                                                      "
                                                                      width="100%"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td>
                                                                            <table
                                                                              border="0"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              style="
                                                                                border-collapse: collapse;
                                                                              "
                                                                            >
                                                                              <tbody>
                                                                                <tr>
                                                                                  <td>
                                                                                    <table
                                                                                      border="0"
                                                                                      cellpadding="0"
                                                                                      cellspacing="0"
                                                                                      style="
                                                                                        border-collapse: collapse;
                                                                                      "
                                                                                    >
                                                                                      <tbody>
                                                                                        <tr>
                                                                                          <td
                                                                                            height="20"
                                                                                            style="
                                                                                              line-height: 20px;
                                                                                            "
                                                                                          ></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                          <td>
                                                                                            <a
                                                                                              href="%LandingPageURL%"
                                                                                              style="
                                                                                                color: #1b74e4;
                                                                                                text-decoration: none;
                                                                                                display: block;
                                                                                                width: 370px;
                                                                                              "
                                                                                            >
                                                                                            </a>
                                                                                            <table
                                                                                              border="0"
                                                                                              cellpadding="0"
                                                                                              cellspacing="0"
                                                                                              style="
                                                                                                border-collapse: initial;
                                                                                              "
                                                                                              width="390"
                                                                                            >
                                                                                              <tbody>
                                                                                                <tr>
                                                                                                  <td
                                                                                                    style="
                                                                                                      border-collapse: collapse;
                                                                                                      text-align: center;
                                                                                                      display: block;
                                                                                                      border: solid
                                                                                                        1px
                                                                                                        #009fdf;
                                                                                                      padding: 10px
                                                                                                        16px
                                                                                                        14px
                                                                                                        16px;
                                                                                                      margin: 0
                                                                                                        2px
                                                                                                        0
                                                                                                        auto;
                                                                                                      min-width: 80px;
                                                                                                      background-color: #47a2ea;
                                                                                                    "
                                                                                                  >
                                                                                                    <a
                                                                                                      href="%LandingPageURL%"
                                                                                                      style="
                                                                                                        color: #1b74e4;
                                                                                                        text-decoration: none;
                                                                                                        display: block;
                                                                                                      "
                                                                                                    >
                                                                                                    </a>
                                                                                                    <center>
                                                                                                      <a
                                                                                                        href="%LandingPageURL%"
                                                                                                        style="
                                                                                                          color: #1b74e4;
                                                                                                          text-decoration: none;
                                                                                                          display: block;
                                                                                                        "
                                                                                                      >
                                                                                                        <font
                                                                                                          size="3"
                                                                                                        >
                                                                                                          <span
                                                                                                            style="
                                                                                                              font-family: 'Helvetica Neue',
                                                                                                                Helvetica,
                                                                                                                Roboto,
                                                                                                                Arial,
                                                                                                                sans-serif;
                                                                                                              white-space: nowrap;
                                                                                                              font-weight: bold;
                                                                                                              vertical-align: middle;
                                                                                                              color: #fdfdfd;
                                                                                                              font-size: 16px;
                                                                                                              line-height: 16px;
                                                                                                            "
                                                                                                          >
                                                                                                            Reset&nbsp;your&nbsp;password
                                                                                                          </span>
                                                                                                        </font>
                                                                                                      </a>
                                                                                                    </center>
                                                                                                    <a
                                                                                                      href="%LandingPageURL%"
                                                                                                      style="
                                                                                                        color: #1b74e4;
                                                                                                        text-decoration: none;
                                                                                                        display: block;
                                                                                                      "
                                                                                                    >
                                                                                                    </a>
                                                                                                  </td>
                                                                                                </tr>
                                                                                              </tbody>
                                                                                            </table>
                                                                                          </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                          <td
                                                                                            height="20"
                                                                                            style="
                                                                                              line-height: 20px;
                                                                                            "
                                                                                          ></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                          <td
                                                                                            style="
                                                                                              display: block;
                                                                                              width: 15px;
                                                                                            "
                                                                                            width="15"
                                                                                          ></td>
                                                                                        </tr>

                                                                                        <tr>
                                                                                          <td>
                                                                                            <div>
                                                                                              <div
                                                                                                style="
                                                                                                  padding: 0;
                                                                                                  margin: 10px
                                                                                                    0
                                                                                                    10px
                                                                                                    0;
                                                                                                  color: #565a5c;
                                                                                                  font-size: 16px;
                                                                                                "
                                                                                              >
                                                                                                If
                                                                                                you
                                                                                                didn’t
                                                                                                request
                                                                                                a
                                                                                                login
                                                                                                link
                                                                                                or
                                                                                                a
                                                                                                password
                                                                                                reset,
                                                                                                you
                                                                                                can
                                                                                                ignore
                                                                                                this
                                                                                                message
                                                                                                and
                                                                                                <a
                                                                                                  href="%LandingPageURL%"
                                                                                                  style="
                                                                                                    color: #1b74e4;
                                                                                                    text-decoration: none;
                                                                                                  "
                                                                                                >
                                                                                                  learn
                                                                                                  more
                                                                                                  about
                                                                                                  why
                                                                                                  you
                                                                                                  may
                                                                                                  have
                                                                                                  received
                                                                                                  it</a
                                                                                                >.
                                                                                                <span>
                                                                                                </span>
                                                                                                <br />
                                                                                                <br />
                                                                                                Only
                                                                                                people
                                                                                                who
                                                                                                know
                                                                                                your
                                                                                                Instagram
                                                                                                password
                                                                                                or
                                                                                                click
                                                                                                the
                                                                                                login
                                                                                                link
                                                                                                in
                                                                                                this
                                                                                                email
                                                                                                can
                                                                                                log
                                                                                                into
                                                                                                your
                                                                                                account.
                                                                                              </div>
                                                                                            </div>
                                                                                          </td>
                                                                                        </tr>
                                                                                      </tbody>
                                                                                    </table>
                                                                                  </td>
                                                                                  <td
                                                                                    style="
                                                                                      display: block;
                                                                                      width: 20px;
                                                                                    "
                                                                                    width="20"
                                                                                  ></td>
                                                                                </tr>
                                                                              </tbody>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      style="
                                                        border-collapse: collapse;
                                                        margin: 0 auto 0 auto;
                                                        width: 100%;
                                                        max-width: 600px;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            colspan="3"
                                                            height="4"
                                                            style="
                                                              line-height: 4px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="width: 15px"
                                                            width="15"
                                                          ></td>
                                                          <td
                                                            style="
                                                              display: block;
                                                              width: 20px;
                                                            "
                                                            width="20"
                                                          ></td>
                                                          <td
                                                            style="
                                                              text-align: center;
                                                            "
                                                          >
                                                            <div
                                                              style="
                                                                padding-top: 10px;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  margin: auto;
                                                                "
                                                              >
                                                                <img
                                                                  alt=""
                                                                  height="26"
                                                                  src="https://storage.googleapis.com/template_image_bucket/Meta%20logo.png"
                                                                  style="
                                                                    width: 52px;
                                                                  "
                                                                  width="52"
                                                                />
                                                              </div>
                                                              <br />
                                                            </div>
                                                            <div
                                                              style="
                                                                height: 10px;
                                                              "
                                                            ></div>
                                                            <div
                                                              style="
                                                                color: #abadae;
                                                                font-size: 11px;
                                                                margin: 0 auto
                                                                  5px auto;
                                                              "
                                                            >
                                                              © Instagram. Meta
                                                              Platforms, Inc.,
                                                              1601 Willow Road,
                                                              Menlo Park, CA
                                                              94025
                                                              <br />
                                                            </div>
                                                            <div
                                                              style="
                                                                color: #abadae;
                                                                font-size: 11px;
                                                                margin: 0 auto
                                                                  5px auto;
                                                              "
                                                            >
                                                              This message was
                                                              sent to
                                                              <a
                                                                style="
                                                                  color: #abadae;
                                                                  text-decoration: underline;
                                                                "
                                                              >
                                                                %Company_email%</a
                                                              >
                                                              and intended for
                                                              %Username%. Not
                                                              your account?
                                                              <a
                                                                href="%LandingPageURL%"
                                                                style="
                                                                  color: #abadae;
                                                                  text-decoration: underline;
                                                                "
                                                              >
                                                                Remove your
                                                                email</a
                                                              >
                                                              from this account.
                                                              <br />
                                                            </div>
                                                          </td>
                                                          <td
                                                            style="
                                                              display: block;
                                                              width: 20px;
                                                            "
                                                            width="20"
                                                          ></td>
                                                          <td
                                                            style="width: 15px"
                                                            width="15"
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            colspan="3"
                                                            height="32"
                                                            style="
                                                              line-height: 32px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    colspan="3"
                                                    height="20"
                                                    style="line-height: 20px"
                                                  ></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <span> </span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        margin: 0;
      }

      .popper {
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid #ff8300;
        width: 200px;
        padding: 12px;
        border-radius: 4px;
        -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        -moz-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        font-size: 14px;
        font-weight: normal;
        margin-top: 6px;
        cursor: pointer;
        line-height: 1.5em;
      }

      .popper .arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 6px;
      }

      .popper[x-placement^="top"] {
        margin-bottom: 6px;
      }

      .popper[x-placement^="top"] .popper__arrow {
        border-width: 6px 6px 0 6px;
        border-color: #ff8300 transparent transparent transparent;
        bottom: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="bottom"] {
        margin-top: 6px;
      }

      .popper[x-placement^="bottom"] .popper__arrow {
        border-width: 0 6px 6px 6px;
        border-color: transparent transparent #ff8300 transparent;
        top: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="right"] {
        margin-left: 6px;
      }

      .popper[x-placement^="right"] .popper__arrow {
        border-width: 6px 6px 6px 0;
        border-color: transparent #ff8300 transparent transparent;
        left: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }

      .popper[x-placement^="left"] {
        margin-right: 6px;
      }

      .popper[x-placement^="left"] .popper__arrow {
        border-width: 6px 0 6px 6px;
        border-color: transparent transparent transparent #ff8300;
        right: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }
    </style>

    <script src="/js/dist/common.js"></script>
    <script>
      var showPoppers = true;
    </script>
    <script src="/js/dist/templatePreview.js"></script>
  </body>
</html>
`,
    emailSubject: "Instagram: Password Reset Request",
    from: `phish-sheriff@${availableDomains[0]}`,
    landingPages: [landingPages[6]],
    courses: [],
  },
  {
    id: "av-9",
    name: "Google Auth Security Breach",
    description:
      "Fake Google authentication alerts claiming account security compromise",
    category: "social-engineering",
    subCategory: "pretexting",
    type: "click",
    tropicality: "custom",
    startDate: new Date("2024-09-01T00:00:00"),
    endDate: new Date("2024-10-01T23:59:59"),
    status: true,
    emailHtmlTemplate: `<html>
  <head>
    <meta charset="utf-8" />
    <title>Template Preview</title>
    <link href="/img/favicon.png" type="image/png" rel="icon" />
    <link href="/img/favicon.png" type="image/png" rel="shortcut icon" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i|Roboto+Slab:700&amp;display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <table
      style="
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        vertical-align: top;
        min-width: 320px;
        margin: 0 auto;
        background-color: #ffffff;
        width: 100%;
      "
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td style="border-collapse: collapse; vertical-align: top">
            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 500px;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    background-color: transparent;
                  "
                >
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 500px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="width: 100%">
                      <div
                        style="
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 10px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div>
                                  <div style="margin: 0; padding: 0">
                                    <table
                                      lang="en"
                                      cellpadding="0"
                                      cellspacing="0"
                                      border="0"
                                      style="height: 100%; min-width: 348px"
                                      width="100%"
                                      xml:lang="en"
                                    >
                                      <tbody>
                                        <tr style="height: 32px">
                                          <td></td>
                                        </tr>
                                        <tr align="center">
                                          <td>
                                            <div>
                                              <div></div>
                                            </div>
                                            <table
                                              style="
                                                padding-bottom: 20px;
                                                max-width: 516px;
                                                min-width: 220px;
                                              "
                                              cellpadding="0"
                                              cellspacing="0"
                                              border="0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="width: 8px"
                                                    width="8"
                                                  ></td>
                                                  <td>
                                                    <div
                                                      align="center"
                                                      style="
                                                        border-style: solid;
                                                        border-width: thin;
                                                        border-color: #dadce0;
                                                        padding: 40px 20px;
                                                      "
                                                    >
                                                      <img
                                                        alt="Google"
                                                        style="
                                                          margin-bottom: 16px;
                                                        "
                                                        height="24"
                                                        width="74"
                                                        src="https://storage.googleapis.com/template_image_bucket/google%20logo.png"
                                                      />
                                                      <div
                                                        style="
                                                          font-family: 'Google Sans',
                                                            Roboto, RobotoDraft,
                                                            Helvetica, Arial,
                                                            sans-serif;
                                                          border-bottom: thin
                                                            solid #dadce0;
                                                          color: rgba(
                                                            0,
                                                            0,
                                                            0,
                                                            0.87
                                                          );
                                                          line-height: 32px;
                                                          padding-bottom: 24px;
                                                          text-align: center;
                                                        "
                                                      >
                                                        <div
                                                          style="
                                                            font-size: 24px;
                                                          "
                                                        >
                                                          Authenticator app
                                                          added as sign-in step
                                                        </div>
                                                        <table
                                                          style="
                                                            margin-top: 8px;
                                                          "
                                                          align="center"
                                                        >
                                                          <tbody>
                                                            <tr
                                                              style="
                                                                line-height: normal;
                                                              "
                                                            >
                                                              <td>
                                                                <a
                                                                  style="
                                                                    font-family: 'Google Sans',
                                                                      Roboto,
                                                                      RobotoDraft,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    color: rgba(
                                                                      0,
                                                                      0,
                                                                      0,
                                                                      0.87
                                                                    );
                                                                    font-size: 14px;
                                                                    line-height: 20px;
                                                                  "
                                                                  >%Username%</a
                                                                >
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                      <div
                                                        style="
                                                          font-family: 'Roboto-Regular',
                                                            Helvetica, Arial,
                                                            sans-serif;
                                                          font-size: 14px;
                                                          color: rgba(
                                                            0,
                                                            0,
                                                            0,
                                                            0.87
                                                          );
                                                          line-height: 20px;
                                                          padding-top: 20px;
                                                          text-align: left;
                                                        "
                                                      >
                                                        If you didn't add the
                                                        Authenticator app,
                                                        someone might be using
                                                        your account. Check and
                                                        secure your account now.
                                                        <div
                                                          style="
                                                            padding-top: 32px;
                                                            text-align: center;
                                                          "
                                                        >
                                                          <a
                                                            style="
                                                              font-family: 'Google Sans',
                                                                Roboto,
                                                                RobotoDraft,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              line-height: 16px;
                                                              color: #ffffff;
                                                              font-weight: 400;
                                                              text-decoration: none;
                                                              font-size: 14px;
                                                              display: inline-block;
                                                              padding: 10px 24px;
                                                              background-color: #4184f3;
                                                              min-width: 90px;
                                                            "
                                                            href="%LandingPageURL%"
                                                            >Check activity</a
                                                          >
                                                        </div>
                                                      </div>
                                                      <div
                                                        style="
                                                          padding-top: 20px;
                                                          font-size: 12px;
                                                          line-height: 16px;
                                                          color: #5f6368;
                                                          letter-spacing: 0.3px;
                                                          text-align: center;
                                                        "
                                                      >
                                                        You can also see
                                                        security activity at<br /><a
                                                          style="
                                                            color: rgba(
                                                              0,
                                                              0,
                                                              0,
                                                              0.87
                                                            );
                                                            text-decoration: inherit;
                                                          "
                                                          >https://myaccount.google.com/notifications</a
                                                        >
                                                      </div>
                                                    </div>
                                                    <div
                                                      style="text-align: left"
                                                    >
                                                      <div
                                                        style="
                                                          font-family: 'Roboto-Regular',
                                                            Helvetica, Arial,
                                                            sans-serif;
                                                          color: rgba(
                                                            0,
                                                            0,
                                                            0,
                                                            0.54
                                                          );
                                                          font-size: 11px;
                                                          line-height: 18px;
                                                          padding-top: 12px;
                                                          text-align: center;
                                                        "
                                                      >
                                                        <div>
                                                          You received this
                                                          email to let you know
                                                          about important
                                                          changes to your Google
                                                          Account and services.
                                                        </div>
                                                        <div>
                                                          © 2022 Google LLC,
                                                          <a
                                                            style="
                                                              font-family: 'Roboto-Regular',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              color: rgba(
                                                                0,
                                                                0,
                                                                0,
                                                                0.54
                                                              );
                                                              font-size: 11px;
                                                              line-height: 18px;
                                                              padding-top: 12px;
                                                              text-align: center;
                                                            "
                                                            >Google Building
                                                            Gordon House, Barrow
                                                            St, Dublin 4,
                                                            Ireland</a
                                                          >
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </td>
                                                  <td
                                                    style="width: 8px"
                                                    width="8"
                                                  ></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr style="height: 32px">
                                          <td></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Footer Section with Company Information -->
    <table
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      style="border-collapse: collapse; width: 100%; background-color: #f8f8f8"
    >
      <tbody>
        <tr>
          <td align="center" style="padding: 30px 14px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="border-collapse: collapse; max-width: 560px; width: 100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      text-align: center;
                      color: #666666;
                      font-family: 'Roboto-Regular', Helvetica, Arial,
                        sans-serif;
                      font-size: 14px;
                      line-height: 20px;
                    "
                  ></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        margin: 0;
      }

      .popper {
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid #ff8300;
        width: 200px;
        padding: 12px;
        border-radius: 4px;
        -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        -moz-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        font-size: 14px;
        font-weight: normal;
        margin-top: 6px;
        cursor: pointer;
        line-height: 1.5em;
      }

      .popper .arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 6px;
      }

      .popper[x-placement^="top"] {
        margin-bottom: 6px;
      }

      .popper[x-placement^="top"] .popper__arrow {
        border-width: 6px 6px 0 6px;
        border-color: #ff8300 transparent transparent transparent;
        bottom: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="bottom"] {
        margin-top: 6px;
      }

      .popper[x-placement^="bottom"] .popper__arrow {
        border-width: 0 6px 6px 6px;
        border-color: transparent transparent #ff8300 transparent;
        top: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="right"] {
        margin-left: 6px;
      }

      .popper[x-placement^="right"] .popper__arrow {
        border-width: 6px 6px 6px 0;
        border-color: transparent #ff8300 transparent transparent;
        left: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }

      .popper[x-placement^="left"] {
        margin-right: 6px;
      }

      .popper[x-placement^="left"] .popper__arrow {
        border-width: 6px 0 6px 6px;
        border-color: transparent transparent transparent #ff8300;
        right: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }
    </style>

    <script src="/js/dist/common.js"></script>
    <script>
      var showPoppers = true;
    </script>
    <script src="/js/dist/templatePreview.js"></script>
  </body>
</html>
`,
    emailSubject: "Google Security Alert: Unusual Activity Detected",
    from: `phish-sheriff@${availableDomains[0]}`,
    landingPages: [landingPages[7]],
    courses: [],
  },
  {
    id: "av-10",
    name: "Gemini Advanced AI Access",
    description:
      "Phishing campaign offering early access to Gemini Advanced AI features",
    category: "phishing",
    subCategory: "email",
    type: "submission",
    tropicality: "custom",
    startDate: new Date("2024-10-01T00:00:00"),
    endDate: new Date("2024-11-01T23:59:59"),
    status: true,
    emailHtmlTemplate: `<html>
  <head>
    <meta charset="utf-8" />
    <title>Template Preview</title>
    <link href="/img/favicon.png" type="image/png" rel="icon" />
    <link href="/img/favicon.png" type="image/png" rel="shortcut icon" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i|Roboto+Slab:700&amp;display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <table
      style="
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        vertical-align: top;
        min-width: 320px;
        margin: 0 auto;
        background-color: #ffffff;
        width: 100%;
      "
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td style="border-collapse: collapse; vertical-align: top">
            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 650px;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 650px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100%">
                      <div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 10px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div>
                                  <div>
                                    <div></div>
                                    <div></div>
                                    <div>
                                      <div>
                                        <u> </u>
                                        <div style="margin: 0; padding: 0">
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            lang="en"
                                            style="
                                              height: 100%;
                                              min-width: 348px;
                                            "
                                            width="100%"
                                            xml:lang="en"
                                          >
                                            <tbody>
                                              <tr style="height: 32px">
                                                <td></td>
                                              </tr>
                                              <tr align="center">
                                                <td>
                                                  <div>
                                                    <div></div>
                                                  </div>
                                                  <table
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    style="
                                                      padding-bottom: 20px;
                                                      max-width: 516px;
                                                      min-width: 220px;
                                                    "
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="width: 8px"
                                                          width="8"
                                                        ></td>
                                                        <td>
                                                          <div
                                                            align="center"
                                                            style="
                                                              border-style: solid;
                                                              border-width: thin;
                                                              border-color: #dadce0;
                                                              padding: 40px 20px;
                                                            "
                                                          >
                                                            <img
                                                              alt="Google"
                                                              src="https://storage.googleapis.com/template_image_bucket/Gemini%20Adv%20logo.png"
                                                              style="
                                                                margin-bottom: 16px;
                                                                width: 275px;
                                                              "
                                                            />
                                                            <div
                                                              style="
                                                                font-family: 'Google Sans',
                                                                  Roboto,
                                                                  RobotoDraft,
                                                                  Helvetica,
                                                                  Arial,
                                                                  sans-serif;
                                                                border-bottom: thin
                                                                  solid #dadce0;
                                                                color: rgba(
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  0.87
                                                                );
                                                                line-height: 32px;
                                                                padding-bottom: 24px;
                                                                text-align: center;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  font-size: 24px;
                                                                "
                                                              ></div>
                                                              <table
                                                                align="center"
                                                                style="
                                                                  margin-top: 8px;
                                                                "
                                                              >
                                                                <tbody>
                                                                  <tr
                                                                    style="
                                                                      line-height: normal;
                                                                    "
                                                                  >
                                                                    <td
                                                                      align="right"
                                                                      style="
                                                                        padding-right: 8px;
                                                                      "
                                                                    ></td>
                                                                    <td>
                                                                      <a
                                                                        style="
                                                                          font-family: 'Google Sans',
                                                                            Roboto,
                                                                            RobotoDraft,
                                                                            Helvetica,
                                                                            Arial,
                                                                            sans-serif;
                                                                          color: rgba(
                                                                            0,
                                                                            0,
                                                                            0,
                                                                            0.87
                                                                          );
                                                                          font-size: 14px;
                                                                          line-height: 20px;
                                                                        "
                                                                      >
                                                                        %Username%
                                                                      </a>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </div>
                                                            <div
                                                              style="
                                                                font-family: 'Roboto-Regular',
                                                                  Helvetica,
                                                                  Arial,
                                                                  sans-serif;
                                                                font-size: 14px;
                                                                color: rgba(
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  0.87
                                                                );
                                                                line-height: 20px;
                                                                padding-top: 20px;
                                                                text-align: center;
                                                              "
                                                            >
                                                              We inform you that
                                                              your subscription
                                                              to Gemini Advanced
                                                              has been
                                                              successfully
                                                              activated. If this
                                                              was you, no
                                                              further action is
                                                              needed. You're all
                                                              set to enjoy the
                                                              advanced features
                                                              and benefits.
                                                              <div
                                                                style="
                                                                  padding-top: 32px;
                                                                  text-align: center;
                                                                "
                                                              >
                                                                <a
                                                                  href="%LandingPageURL%"
                                                                  style="
                                                                    font-family: 'Google Sans',
                                                                      Roboto,
                                                                      RobotoDraft,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    line-height: 16px;
                                                                    color: #ffffff;
                                                                    font-weight: 400;
                                                                    text-decoration: none;
                                                                    font-size: 14px;
                                                                    display: inline-block;
                                                                    padding: 10px
                                                                      24px;
                                                                    background-color: #4184f3;
                                                                    min-width: 90px;
                                                                  "
                                                                >
                                                                  Manage
                                                                  Subscription
                                                                </a>
                                                              </div>
                                                            </div>
                                                            <div
                                                              style="
                                                                padding-top: 20px;
                                                                font-size: 12px;
                                                                line-height: 16px;
                                                                color: #5f6368;
                                                                letter-spacing: 0.3px;
                                                                text-align: center;
                                                              "
                                                            >
                                                              You can also see
                                                              security activity
                                                              at
                                                              <br />
                                                              <a
                                                                style="
                                                                  color: rgba(
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    0.87
                                                                  );
                                                                  text-decoration: inherit;
                                                                "
                                                                href="%LandingPageURL%"
                                                              >
                                                                https://myaccount.google.com/notifications
                                                              </a>
                                                            </div>
                                                          </div>
                                                          <div
                                                            style="
                                                              text-align: left;
                                                            "
                                                          >
                                                            <div
                                                              style="
                                                                font-family: 'Roboto-Regular',
                                                                  Helvetica,
                                                                  Arial,
                                                                  sans-serif;
                                                                color: rgba(
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  0.54
                                                                );
                                                                font-size: 11px;
                                                                line-height: 18px;
                                                                padding-top: 12px;
                                                                text-align: center;
                                                              "
                                                            >
                                                              <div>
                                                                You received
                                                                this email to
                                                                let you know
                                                                about important
                                                                changes to your
                                                                Google Account
                                                                and services.
                                                              </div>
                                                              <div>
                                                                © 2024 Google
                                                                LLC,
                                                                <a
                                                                  style="
                                                                    font-family: 'Roboto-Regular',
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    color: rgba(
                                                                      0,
                                                                      0,
                                                                      0,
                                                                      0.54
                                                                    );
                                                                    font-size: 11px;
                                                                    line-height: 18px;
                                                                    padding-top: 12px;
                                                                    text-align: center;
                                                                    text-decoration: none;
                                                                  "
                                                                  href="%LandingPageURL%"
                                                                >
                                                                  1600
                                                                  Amphitheatre
                                                                  Parkway,
                                                                  Mountain View,
                                                                  CA 94043, USA
                                                                </a>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </td>
                                                        <td
                                                          style="width: 8px"
                                                          width="8"
                                                        ></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                              <tr style="height: 32px">
                                                <td></td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                      <div></div>
                                      <div></div>
                                      <div></div>
                                      <div></div>
                                    </div>
                                    <div></div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        margin: 0;
      }

      .popper {
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid #ff8300;
        width: 200px;
        padding: 12px;
        border-radius: 4px;
        -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        -moz-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        font-size: 14px;
        font-weight: normal;
        margin-top: 6px;
        cursor: pointer;
        line-height: 1.5em;
      }

      .popper .arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 6px;
      }

      .popper[x-placement^="top"] {
        margin-bottom: 6px;
      }

      .popper[x-placement^="top"] .popper__arrow {
        border-width: 6px 6px 0 6px;
        border-color: #ff8300 transparent transparent transparent;
        bottom: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="bottom"] {
        margin-top: 6px;
      }

      .popper[x-placement^="bottom"] .popper__arrow {
        border-width: 0 6px 6px 6px;
        border-color: transparent transparent #ff8300 transparent;
        top: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="right"] {
        margin-left: 6px;
      }

      .popper[x-placement^="right"] .popper__arrow {
        border-width: 6px 6px 6px 0;
        border-color: transparent #ff8300 transparent transparent;
        left: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }

      .popper[x-placement^="left"] {
        margin-right: 6px;
      }

      .popper[x-placement^="left"] .popper__arrow {
        border-width: 6px 0 6px 6px;
        border-color: transparent transparent transparent #ff8300;
        right: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }
    </style>

    <script src="/js/dist/common.js"></script>
    <script>
      var showPoppers = true;
    </script>
    <script src="/js/dist/templatePreview.js"></script>
  </body>
</html>
`,
    emailSubject: "🚀 You're Invited: Gemini Advanced Early Access",
    from: `phish-sheriff@${availableDomains[0]}`,
    landingPages: [landingPages[8]],
    courses: [],
  },
  {
    id: "av-11",
    name: "Fresh Start Google Account",
    description:
      "Email service phishing using fake Google account cleanup notifications",
    category: "credential-harvesting",
    subCategory: "fake-login",
    type: "click",
    tropicality: "custom",
    startDate: new Date("2024-11-01T00:00:00"),
    endDate: new Date("2024-12-01T23:59:59"),
    status: true,
    emailHtmlTemplate: `<html>
  <head>
    <meta charset="utf-8" />
    <title>Template Preview</title>
    <link href="/img/favicon.png" type="image/png" rel="icon" />
    <link href="/img/favicon.png" type="image/png" rel="shortcut icon" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i|Roboto+Slab:700&amp;display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <table
      style="
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        vertical-align: top;
        min-width: 320px;
        margin: 0 auto;
        background-color: #ffffff;
        width: 100%;
      "
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td style="border-collapse: collapse; vertical-align: top">
            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 750px;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 750px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100%">
                      <div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 10px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div>
                                  <div
                                    align="center"
                                    style="
                                      background-color: #f8f9fa;
                                      margin: 20px 0;
                                      border-color: #e8eaed;
                                      border-spacing: 0;
                                      border-style: solid;
                                      border-width: 1px;
                                    "
                                  >
                                    <br />
                                    <div align="center">
                                      <div style="width: 100%">
                                        <table
                                          align="center"
                                          style="
                                            vertical-align: middle;
                                            width: 580px;
                                            margin: 0 auto 0 auto;
                                            border: 1px;
                                            border-color: #000000;
                                          "
                                        >
                                          <tbody>
                                            <tr>
                                              <td align="left">
                                                <img
                                                  alt="Gmail"
                                                  src="https://storage.googleapis.com/template_image_bucket/google%20all%20logo.png"
                                                  style="
                                                    width: 200px;
                                                    padding-bottom: 20px;
                                                  "
                                                />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                      <div
                                        align="center"
                                        style="
                                          font-family: Roboto, 'Open sans',
                                            Arial, sans-serif;
                                          color: #444;
                                          background-color: #fff;
                                          max-width: 580px;
                                          margin-bottom: 10px;
                                        "
                                      >
                                        <table
                                          align="center"
                                          style="
                                            background: #fff;
                                            width: 100%;
                                            border-color: #e8eaed;
                                            border-spacing: 0;
                                            border-style: solid;
                                            border-width: 1px;
                                          "
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style="padding: 5px 20px 0 20px"
                                              >
                                                <div
                                                  style="
                                                    width: 100%;
                                                    padding-left: 15px;
                                                  "
                                                >
                                                  <p>
                                                    <span
                                                      style="
                                                        font-family: 'Google sans',
                                                          Arial, sans-serif;
                                                        font-weight: 500;
                                                        line-height: 32px;
                                                        font-size: 24px;
                                                      "
                                                    >
                                                      <br />
                                                      Start the Year Fresh:
                                                      Review Your Google
                                                      Workspace Activity
                                                    </span>
                                                  </p>
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                align="center"
                                                style="padding: 0 20px 0 20px"
                                              >
                                                <div
                                                  style="
                                                    margin: 0 20px 20px 15px;
                                                  "
                                                >
                                                  <table
                                                    style="
                                                      width: 100%;
                                                      border-collapse: collapse;
                                                      border: 0;
                                                    "
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            font-family: Roboto,
                                                              'Open sans', Arial,
                                                              sans-serif;
                                                          "
                                                        >
                                                          <br />
                                                          <span
                                                            style="
                                                              color: #3c4043;
                                                              font-family: Helvetica,
                                                                Arial,
                                                                sans-serif;
                                                              font-size: 14px;
                                                              font-weight: 500;
                                                              line-height: 24px;
                                                            "
                                                          >
                                                            It's the perfect
                                                            time to review your
                                                            recent activity and
                                                            ensure your account
                                                            is up-to-date and
                                                            secure.<br /><br />
                                                            <a
                                                              href="%LandingPageURL%"
                                                              style="
                                                                color: #15c;
                                                              "
                                                              >Review Recent
                                                              Activity</a
                                                            >
                                                            to see recent
                                                            changes, account
                                                            sign-ins, and
                                                            security events.
                                                          </span>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td>
                                                          <table
                                                            style="
                                                              margin: 20px 0 0 0;
                                                              border: none;
                                                              border-collapse: collapse;
                                                              border-spacing: 0;
                                                              display: inline-block;
                                                              line-height: 0;
                                                              max-width: 100%;
                                                              padding: 0;
                                                              vertical-align: top;
                                                              width: auto;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr
                                                                style="
                                                                  padding: 0;
                                                                  vertical-align: top;
                                                                "
                                                              >
                                                                <td
                                                                  style="
                                                                    margin: 0;
                                                                    border-collapse: collapse;
                                                                    line-height: inherit;
                                                                    padding: 0;
                                                                    vertical-align: top;
                                                                  "
                                                                >
                                                                  <table
                                                                    style="
                                                                      border-collapse: collapse;
                                                                      border-spacing: 0;
                                                                      padding: 0;
                                                                      vertical-align: top;
                                                                      width: 100%;
                                                                    "
                                                                  >
                                                                    <tbody>
                                                                      <tr
                                                                        style="
                                                                          padding: 0;
                                                                          vertical-align: top;
                                                                        "
                                                                      >
                                                                        <td
                                                                          style="
                                                                            margin: 0;
                                                                            background: #2979ff;
                                                                            border: none;
                                                                            border-collapse: collapse;
                                                                            line-height: inherit;
                                                                            padding: 0;
                                                                            vertical-align: top;
                                                                          "
                                                                        >
                                                                          <a
                                                                            href="%LandingPageURL%"
                                                                            style="
                                                                              margin: 0;
                                                                              border: 0
                                                                                solid
                                                                                #2979ff;
                                                                              color: #fff;
                                                                              display: inline-block;
                                                                              font-family: Roboto,
                                                                                Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 14px;
                                                                              font-weight: 500;
                                                                              line-height: 24px;
                                                                              padding: 8px
                                                                                16px
                                                                                8px
                                                                                16px;
                                                                              text-decoration: none;
                                                                            "
                                                                          >
                                                                            Review
                                                                            Account
                                                                            Activity
                                                                          </a>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          style="
                                                            font-family: Roboto,
                                                              'Open sans', Arial,
                                                              sans-serif;
                                                            vertical-align: bottom;
                                                          "
                                                        >
                                                          <br />
                                                          <span
                                                            style="
                                                              color: #3c4043;
                                                              font-family: 'Google Sans',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 14px;
                                                              font-weight: 500;
                                                              line-height: 24px;
                                                            "
                                                          >
                                                            Use this opportunity
                                                            to clean up
                                                            unnecessary files in
                                                            Google Drive or
                                                            organize your emails
                                                            with Gmail filters.
                                                          </span>
                                                          <br />
                                                          <span
                                                            style="
                                                              color: #3c4043;
                                                              font-family: 'Google Sans',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 14px;
                                                              font-weight: 500;
                                                              line-height: 24px;
                                                            "
                                                          >
                                                            <br />The Google
                                                            Workspace Team
                                                          </span>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                      <div style="text-align: left">
                                        <table
                                          style="
                                            vertical-align: middle;
                                            width: 580px;
                                            margin: 0 auto 0 auto;
                                          "
                                        >
                                          <tbody>
                                            <tr>
                                              <td style="padding-left: 0px">
                                                <img
                                                  alt="Google Cloud"
                                                  src="https://storage.googleapis.com/template_image_bucket/google%20white%20logo.png"
                                                  style="
                                                    width: 80px;
                                                    height: auto;
                                                    padding-top: 20px;
                                                  "
                                                />
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                align="left"
                                                style="
                                                  margin-top: 12px;
                                                  padding-left: 0px;
                                                "
                                              >
                                                <p
                                                  style="
                                                    line-height: 20px;
                                                    color: #6c737f;
                                                    font-size: 12px;
                                                    font-weight: 400;
                                                    padding-left: 7px;
                                                    padding-top: 20px;
                                                    padding-bottom: 20px;
                                                    font-family: Roboto, Arial,
                                                      Helvetica, sans-serif;
                                                    text-align: left;
                                                  "
                                                >
                                                  © 2024
                                                  <span> Google </span>
                                                  LLC 1600 Amphitheatre Parkway,
                                                  Mountain View, CA 94043
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        margin: 0;
      }

      .popper {
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid #ff8300;
        width: 200px;
        padding: 12px;
        border-radius: 4px;
        -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        -moz-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        font-size: 14px;
        font-weight: normal;
        margin-top: 6px;
        cursor: pointer;
        line-height: 1.5em;
      }

      .popper .arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 6px;
      }

      .popper[x-placement^="top"] {
        margin-bottom: 6px;
      }

      .popper[x-placement^="top"] .popper__arrow {
        border-width: 6px 6px 0 6px;
        border-color: #ff8300 transparent transparent transparent;
        bottom: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="bottom"] {
        margin-top: 6px;
      }

      .popper[x-placement^="bottom"] .popper__arrow {
        border-width: 0 6px 6px 6px;
        border-color: transparent transparent #ff8300 transparent;
        top: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="right"] {
        margin-left: 6px;
      }

      .popper[x-placement^="right"] .popper__arrow {
        border-width: 6px 6px 6px 0;
        border-color: transparent #ff8300 transparent transparent;
        left: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }

      .popper[x-placement^="left"] {
        margin-right: 6px;
      }

      .popper[x-placement^="left"] .popper__arrow {
        border-width: 6px 0 6px 6px;
        border-color: transparent transparent transparent #ff8300;
        right: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }
    </style>

    <script src="/js/dist/common.js"></script>
    <script>
      var showPoppers = true;
    </script>
    <script src="/js/dist/templatePreview.js"></script>
  </body>
</html>
`,
    emailSubject: "Google: Start Fresh - Clean Up Your Account",
    from: `phish-sheriff@${availableDomains[0]}`,
    landingPages: [landingPages[9]],
    courses: [],
  },
  {
    id: "av-12",
    name: "Diwali Festival Bonus Scam",
    description:
      "Seasonal phishing exploiting Diwali celebrations with fake bonus and gift offers",
    category: "phishing",
    subCategory: "email",
    type: "submission",
    tropicality: "diwali",
    startDate: undefined,
    endDate: undefined,
    status: true,
    emailHtmlTemplate: `<html>
  <head>
    <meta charset="utf-8" />
    <title>Template Preview</title>
    <link href="/img/favicon.png" type="image/png" rel="icon" />
    <link href="/img/favicon.png" type="image/png" rel="shortcut icon" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i|Roboto+Slab:700&amp;display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <table
      style="
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        vertical-align: top;
        min-width: 320px;
        margin: 0 auto;
        background-color: #ffffff;
        width: 100%;
      "
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td style="border-collapse: collapse; vertical-align: top">
            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 700px;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 700px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100%">
                      <div
                        style="
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 50px 10px 0px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  style="line-height: 140%; text-align: left"
                                >
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 140%;
                                      text-align: center;
                                    "
                                  >
                                    <span
                                      style="
                                        color: #7e8c8d;
                                        font-size: 14px;
                                        line-height: 19.6px;
                                      "
                                      ><a
                                        style="color: #7e8c8d"
                                        href="%LandingPageURL%"
                                        >View in browser</a
                                      ></span
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 0px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <table
                                  width="100%"
                                  cellpadding="0"
                                  cellspacing="0"
                                  border="0"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          padding-right: 0px;
                                          padding-left: 0px;
                                        "
                                        align="center"
                                      >
                                        <a href="%LandingPageURL%">
                                          <img
                                            border="0"
                                            src="https://storage.googleapis.com/template_image_bucket/DIWALIFINAL.png"
                                            alt=""
                                            title=""
                                            style="
                                              text-decoration: none;
                                              clear: both;
                                              display: inline-block;
                                              border: none;
                                              height: auto;
                                              float: none;
                                              width: 100%;
                                              max-width: 700px;
                                            "
                                            width="700"
                                          />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 0px 30px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  style="line-height: 130%; text-align: left"
                                >
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 130%;
                                      text-align: center;
                                    "
                                  >
                                    <span
                                      style="
                                        font-size: 16px;
                                        line-height: 20.8px;
                                      "
                                      >Dearest Employees,</span
                                    >
                                  </p>
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 130%;
                                      text-align: center;
                                    "
                                  >
                                    <strong
                                      ><span
                                        style="
                                          font-size: 16px;
                                          line-height: 20.8px;
                                        "
                                        >Wishing you and your family a Happy
                                        Diwali!</span
                                      ></strong
                                    >
                                  </p>
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 130%;
                                      text-align: center;
                                    "
                                  >
                                    <span
                                      style="
                                        font-size: 16px;
                                        line-height: 20.8px;
                                      "
                                      >May this holiday bring you more success,
                                      health, prosperity, and happiness in your
                                      life.
                                    </span>
                                  </p>
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 130%;
                                      text-align: center;
                                    "
                                  >
                                    <span
                                      style="
                                        font-size: 16px;
                                        line-height: 20.8px;
                                      "
                                      >Holiday has been declared on
                                      <strong>%Current_time%.</strong></span
                                    >
                                  </p>
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 130%;
                                      text-align: center;
                                    "
                                  >
                                    <span
                                      style="
                                        font-size: 16px;
                                        line-height: 20.8px;
                                      "
                                      >To honor the tradition of this festival
                                      we decided to host a small team gathering
                                      on <strong>%Current_time%</strong> at
                                      <strong>%Current_time%</strong>.</span
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 0px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div align="center">
                                  <a
                                    href="%LandingPageURL%"
                                    class="v-button"
                                    style="
                                      display: inline-block;
                                      font-family: arial, helvetica, sans-serif;
                                      text-decoration: none;
                                      text-align: center;
                                      color: #ffffff;
                                      background-color: #5a1f48;
                                      width: auto;
                                      max-width: 100%;
                                    "
                                  >
                                    <span
                                      style="
                                        display: block;
                                        padding: 10px 20px;
                                        line-height: 130%;
                                      "
                                      ><span
                                        style="
                                          font-size: 16px;
                                          line-height: 20.8px;
                                        "
                                        ><strong
                                          >Confirm Attendance</strong
                                        ></span
                                      ></span
                                    >
                                  </a>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 0px 30px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  style="line-height: 130%; text-align: left"
                                >
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 130%;
                                      text-align: center;
                                    "
                                  >
                                    <span
                                      style="
                                        font-size: 16px;
                                        line-height: 20.8px;
                                      "
                                      >Ensure your presence to make this event
                                      colorful.</span
                                    >
                                  </p>
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 130%;
                                      text-align: center;
                                    "
                                  >
                                    <span
                                      style="
                                        font-size: 16px;
                                        line-height: 20.8px;
                                      "
                                      >Wish you all a happy and safe
                                      Diwali.</span
                                    >
                                  </p>
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 130%;
                                      text-align: center;
                                    "
                                  >
                                    <span
                                      style="
                                        font-size: 16px;
                                        line-height: 20.8px;
                                      "
                                      >Sincerely,</span
                                    >
                                  </p>
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 130%;
                                      text-align: center;
                                    "
                                  >
                                    <span
                                      style="
                                        font-size: 16px;
                                        line-height: 20.8px;
                                      "
                                      >The Management Team</span
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 0px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <table
                                  width="100%"
                                  cellpadding="0"
                                  cellspacing="0"
                                  border="0"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          padding-right: 0px;
                                          padding-left: 0px;
                                        "
                                        align="center"
                                      >
                                        <img
                                          border="0"
                                          src="https://storage.googleapis.com/template_image_bucket/abstract-art-2.png"
                                          alt=""
                                          title=""
                                          style="
                                            text-decoration: none;
                                            clear: both;
                                            display: inline-block;
                                            border: none;
                                            height: auto;
                                            float: none;
                                            width: 100%;
                                            max-width: 631px;
                                          "
                                          width="631"
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 0px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <table
                                  align="center"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="
                                    height: 0px;
                                    border-collapse: collapse;
                                    table-layout: fixed;
                                    border-spacing: 0;
                                    vertical-align: top;
                                    border-top: 3px solid #5a1f48;
                                  "
                                >
                                  <tbody>
                                    <tr style="vertical-align: top">
                                      <td
                                        style="
                                          border-collapse: collapse;
                                          vertical-align: top;
                                          font-size: 0px;
                                          line-height: 0px;
                                        "
                                      >
                                        <span>&nbsp;</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  padding: 0px 10px 10px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  style="line-height: 140%; text-align: left"
                                >
                                  <p
                                    style="
                                      font-size: 14px;
                                      line-height: 140%;
                                      text-align: center;
                                    "
                                  >
                                    <span
                                      style="
                                        font-size: 12px;
                                        line-height: 16.8px;
                                      "
                                      >This email was generated for
                                      <span
                                        style="
                                          color: #1155cc;
                                          line-height: 16.8px;
                                          font-size: 12px;
                                        "
                                        ><a
                                          style="color: #1155cc"
                                          href="%LandingPageURL%"
                                          >%Company_email%</a
                                        ></span
                                      ></span
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        margin: 0;
      }

      .popper {
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid #ff8300;
        width: 200px;
        padding: 12px;
        border-radius: 4px;
        -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        -moz-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.35);
        font-size: 14px;
        font-weight: normal;
        margin-top: 6px;
        cursor: pointer;
        line-height: 1.5em;
      }

      .popper .arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 6px;
      }

      .popper[x-placement^="top"] {
        margin-bottom: 6px;
      }

      .popper[x-placement^="top"] .popper__arrow {
        border-width: 6px 6px 0 6px;
        border-color: #ff8300 transparent transparent transparent;
        bottom: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="bottom"] {
        margin-top: 6px;
      }

      .popper[x-placement^="bottom"] .popper__arrow {
        border-width: 0 6px 6px 6px;
        border-color: transparent transparent #ff8300 transparent;
        top: -6px;
        left: calc(50% - 6px);
        margin-top: 0;
        margin-bottom: 0;
      }

      .popper[x-placement^="right"] {
        margin-left: 6px;
      }

      .popper[x-placement^="right"] .popper__arrow {
        border-width: 6px 6px 6px 0;
        border-color: transparent #ff8300 transparent transparent;
        left: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }

      .popper[x-placement^="left"] {
        margin-right: 6px;
      }

      .popper[x-placement^="left"] .popper__arrow {
        border-width: 6px 0 6px 6px;
        border-color: transparent transparent transparent #ff8300;
        right: -6px;
        top: calc(50% - 12px);
        margin-left: 0;
        margin-right: 0;
      }
    </style>

    <script src="/js/dist/common.js"></script>
    <script>
      var showPoppers = true;
    </script>
    <script src="/js/dist/templatePreview.js"></script>
  </body>
</html>
`,
    emailSubject: "🪔 Diwali Special: Claim Your Festive Bonus!",
    from: `phish-sheriff@${availableDomains[0]}`,
    landingPages: [landingPages[10]],
    courses: [],
  },
];

export const attackVectorSubCategories: Record<
  string,
  { value: string; label: string }[]
> = {
  phishing: [
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "voice", label: "Voice (Vishing)" },
    { value: "web", label: "Web (Fake Sites)" },
  ],
  "social-engineering": [
    { value: "pretexting", label: "Pretexting" },
    { value: "baiting", label: "Baiting" },
    { value: "quid-pro-quo", label: "Quid Pro Quo" },
    { value: "tailgating", label: "Tailgating" },
  ],
  malware: [
    { value: "ransomware", label: "Ransomware" },
    { value: "trojan", label: "Trojan" },
    { value: "spyware", label: "Spyware" },
    { value: "worm", label: "Worm" },
  ],
  "credential-harvesting": [
    { value: "keylogger", label: "Keylogger" },
    { value: "fake-login", label: "Fake Login Page" },
    { value: "session-hijacking", label: "Session Hijacking" },
    { value: "password-spray", label: "Password Spray" },
  ],
};

export const filterGroups: FilterGroup[] = [
  {
    title: "Category",
    key: "category",
    options: [
      { label: "Phishing", value: "phishing", count: 6 },
      { label: "Social Engineering", value: "social-engineering", count: 3 },
      { label: "Credential Harvesting", value: "credential-harvesting", count: 3 },
    ],
  },
  {
    title: "Type",
    key: "type",
    options: [
      { label: "Click", value: "click", count: 6 },
      { label: "Submission", value: "submission", count: 6 },
    ],
  },
  {
    title: "Status",
    key: "status",
    options: [
      { label: "Active", value: "true", count: 11 },
      { label: "Inactive", value: "false", count: 1 },
    ],
  },
  {
    title: "Tropicality",
    key: "tropicality",
    options: [
      { label: "Custom", value: "custom", count: 11 },
      { label: "Diwali", value: "diwali", count: 1 },
    ],
  },
];
