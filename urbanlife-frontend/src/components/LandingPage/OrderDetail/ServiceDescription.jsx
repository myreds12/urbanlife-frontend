import React from 'react';

const ServiceDescription = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Description</h2>
      
      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
        <p>
          Suitable for traveling with a small group. This car can accommodate 4 - 6 passengers. 
          The service that we offer is the car with driver included as a package and to be used 
          within Jakarta area only. We do not provide car rental with no driver included and to 
          be used outside Jakarta area.
        </p>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Policy and procedure:</h3>
          <div className="space-y-3">
            <p>
              This service needs to be booked at least 3 days before the selected date of the service 
              being provided to you and the payment of the service booked needs to be made within 1 day 
              (1×24 hours) after the booking made. The payment link will be provided in the booking 
              confirmation email sent to your email address once you have made the booking. We have 
              the right to cancel your booking if the payment has not been received within 1 day 
              (1×24 hours) after the booking made due to the time needed to process and prepare the 
              service to be provided to you.
            </p>
            
            <p>
              Shall the service needs to be cancelled due to force majeure, the available options are 
              either to get full refund or re-arrange the date of the service being used without any 
              additional charge applied and valid within 6 months from the original date of the service 
              supposedly being used.
            </p>
            
            <p>
              Shall the service needs to be cancelled due to other reasons, the available option is to 
              re-arrange the date of the service being used without any additional charge applied and 
              valid within 6 months from the original date of the service supposedly being used.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDescription;
