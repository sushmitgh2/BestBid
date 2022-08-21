import React from 'react';
import img from '../../../assets/images/background/img-create-item.jpg'

const Create = () => {
return (
    <section className="tf-section create-item pd-top-0 mg-t-40">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="form-create-item-content">
                        <div className="form-create-item">
                            <div className="sc-heading">
                                <h3>Create Item</h3>
                            </div>
                            <form id="create-item-1" action="#" method="GET" acceptCharset="utf-8">
                                <label className="uploadFile">
                                    <span className="filename">Choose Item</span>
                                    <input type="file" className="inputfile form-control" name="file" />
                                    <span className="icon"><i className="far fa-cloud-upload"></i></span>
                                </label>
                                <div className="input-group">
                                    <input name="name" type="text" placeholder="Item Name" required />
                                    <input name="number" type="text" placeholder="Item Minimum Price"
                                        required />
                                </div>
                              
                                <textarea id="comment-message" name="message" tabIndex="4"
                                    placeholder="Description" aria-required="true"></textarea>
                                <div className="input-group style-2 ">
                                   
                                </div>
                                <button name="submit" type="submit" id="submit"
                                    className="sc-button style letter style-2"><span>Create Item</span> </button>
                            </form>
                        </div>
                        <div className="form-background">
                            <img src={img} alt="BestBid" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Create;
