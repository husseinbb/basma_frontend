import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faFacebookSquare, faInstagram, faTiktok} from '@fortawesome/free-brands-svg-icons'

const SuccessfullRegistration = (props) => {

    const aboutUs = [
        'Basma is redefining oral health by using modern technology to help deliver human-focused care. With a commitment to creating the best outcomes, Basma inspires confidence and promotes wellbeing.',
         <br />, <br />,
        'Customers order and complete an at-home impression kit, send it back to us, and we deliver their custom invisible aligners right to them.',
        <br />, <br />,
        'We are cutting down the costs of getting orthodontic treatment by up to 65% and giving our customers the perfect smile in an average of 6 months. Our board-certified orthodontists oversee the entire treatment process, from designing to manufacturing, so our customers are always in good hands and feel connected constantly to their doctors on our platform.',
    ]

    return (
        <div className="m-3">
            <div className="text-center m-3">
                <h2>Thanks for Registration!</h2>
            </div>
            <div className="m-3">
                <h4>About Us</h4>
                <p>
                    <i>{aboutUs}</i>
                </p>
            </div>
            <div className="m-3 mt-5">
                <h4>Locations</h4>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row mt-3">
                                <div className="col-md-3">
                                    <div className="">
                                        <h5><b>London, GB</b></h5>
                                        <a href="https://www.bing.com/maps?where=London+GB&trk=org-locations_url">Get directions</a>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                <div className="">
                                    <h5><b>Beirut, LB</b></h5>
                                        <a href="https://www.bing.com/maps?where=Beirut+LB&trk=org-locations_url">Get directions</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="row mt-5">
                                <div className="col-md-3">
                                    <div>
                                        <h5><b>Dubai, AE</b></h5>
                                        <a href="https://www.bing.com/maps?where=Dubai+AE&trk=org-locations_url">Get directions</a>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                <div>
                                    <h5><b>Riyadh, SA</b></h5>
                                        <a href="https://www.bing.com/maps?where=Riyadh+SA&trk=org-locations_url">Get directions</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-3 mt-5">
                <h4>Social Media Accounts</h4>
                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col-md-1">
                            <a href="https://www.linkedin.com/company/basma">
                                <FontAwesomeIcon icon={faLinkedin} size="lg" />
                            </a>
                        </div>
                        <div className="col-md-1">
                            <a href="https://m.facebook.com/wearebasma/?tsid=0.3451732004326411&source=result">
                                <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
                            </a>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-1">
                            <a href="https://www.linkedin.com/company/basma">
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </a>
                        </div>
                        <div className="col-md-1">
                            <a href="https://vm.tiktok.com/ZSJt4r7bM/">
                                <FontAwesomeIcon icon={faTiktok} size="lg" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessfullRegistration;