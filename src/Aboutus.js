import React from 'react';
import Navbar from "./Navbar";

import './Aboutus.css';

const Aboutus = () => {
    return (
        <>
        <Navbar/>
        <div className="cg">
            <div className="about-us-content">

                <h1>About us</h1>
                    <p>
                        We’re a unique agency, putting pharmacies at the forefront of web technology
                    </p>

                <h4>We Always Deliver</h4>
                    <p>
                        Putting our clients’ needs has been at the core of our team’s culture since day one. 
                        We began as a small web design agency and have spent over a decade growing exponentially
                        into a comprehensive digital agency, which provides the best possible design, development,
                        and marketing services for the pharmacy industry through our philosophy of ensuring delivery.
                    </p>

                <h4>We really understand pharmacy</h4>
                    <p>
                        Not only have we been providing to the pharmacy sector for over a decade, but we've also got first-hand experience
                        in running pharmacies.Two of the founding partners within our business are community pharmacists,
                        which is why we understand the importance of web technology for your pharmacy.
                    </p>

            </div>
        </div>
        </>
    );
};

export default Aboutus;