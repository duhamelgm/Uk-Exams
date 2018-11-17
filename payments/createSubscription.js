const paypal = require("paypal-rest-sdk");

const createSubscription = (url, course, plan, profile) => {
  return new Promise((resolve, reject) => {
    const billingPlanAttributes = {
      name: "Testing1-Regular1",
      description: "Create Plan for Regular",
      type: "INFINITE",
      payment_definitions: [
        {
          name: "Regular 1",
          type: "REGULAR",
          cycles: "0",
          frequency: plan.frequency,
          frequency_interval: plan.interval,
          amount: {
            currency: "USD",
            value: plan.price
          }
        }
      ],
      merchant_preferences: {
        auto_bill_amount: "yes",
        cancel_url: `${url}/api/profile/course-buy-cancel/${course.handle}/${
          profile._id
        }`,
        initial_fail_amount_action: "continue",
        max_fail_attempts: "1",
        return_url: `${url}/api/profiles/course-buy/${course.handle}/${
          profile._id
        }`
      }
    };

    const billingPlanUpdateAttributes = [
      {
        op: "replace",
        path: "/",
        value: {
          state: "ACTIVE"
        }
      }
    ];

    const isoDate = new Date();
    isoDate.setSeconds(isoDate.getSeconds() + 20);
    isoDate.toISOString().slice(0, 19) + "Z";

    const billingAgreementAttributes = {
      name: plan.title,
      description: plan.title,
      start_date: isoDate,
      plan: {
        id: ""
      },
      payer: {
        payment_method: "paypal"
      },
      shipping_address: {
        line1: profile.address,
        city: profile.city,
        state: profile.state,
        postal_code: profile.zip,
        country_code: "GB"
      }
    };

    paypal.billingPlan.create(billingPlanAttributes, (err, billingPlan) => {
      if (err) {
        reject(err);
      } else {
        paypal.billingPlan.update(
          billingPlan.id,
          billingPlanUpdateAttributes,
          (err, response) => {
            if (err) {
              reject(err);
            } else {
              billingAgreementAttributes.plan.id = billingPlan.id;

              paypal.billingAgreement.create(
                billingAgreementAttributes,
                function(err, billingAgreement) {
                  if (err) {
                    reject(err);
                  } else {
                    for (
                      let index = 0;
                      index < billingAgreement.links.length;
                      index++
                    ) {
                      if (
                        billingAgreement.links[index].rel === "approval_url"
                      ) {
                        const approval_url = billingAgreement.links[index].href;

                        resolve(approval_url);
                      }
                    }
                  }
                }
              );
            }
          }
        );
      }
    });
  });
};

module.exports = createSubscription;
