import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ratings.css';

export function Ratings({recommendationPage}) {
    const handleRatingSubmit = (event) => {
        event.preventDefault();
        // Implement your rating submission logic here
    }

    return (
        <main className="ratings-main container-fluid">
            <div className="users">
                User:
                <span className="user-name"></span>
            </div>
            <div className="notification" id="messages"></div>
            <div className="Updates">
                Movie/TV show updates in the News:
            </div>
            <div className="news">
                <div className="news-notif"></div>
                <div className="news-notif"></div>
                <div className="news-notif"></div>
            </div>

            <br />
            <div className="Checkboxes">
                <legend>Mark Genres You Like:</legend>
                <div className="ratings-checkboxdiv1 form-check">
                    <input className="ratings-checkbox1 form-check-input" type="checkbox" name="comedyCheckBox" id="comedies" value="Comedy" />
                    <label className="form-check-label" htmlFor="genre1">Comedies</label>
                </div>
                <div className="ratings-checkboxdiv2 form-check">
                    <input className="ratings-checkbox2 form-check-input" type="checkbox" name="actionCheckBox" id="action" value="Action" />
                    <label className="form-check-label" htmlFor="genre2">Action</label>
                </div>
                <div className="ratings-checkboxdiv3 form-check">
                    <input className="ratings-checkbox3 form-check-input" type="checkbox" name="romanceCheckBox" id="romance" value="Romance" />
                    <label className="form-check-label" htmlFor="genre3">Romance</label>
                </div>
            </div>
            <br />
            
            <legend className="rating-label">Rate the Following:</legend>
            <div className="rating-specific">
                <div className="RatingMovie1">
                    <div><b>Superbad 2007</b></div>
                    <img src="PhotosForWebsite/Comedy1.jpg" width="200" alt="Comedy" className="MoviePhoto" />
                    <legend>Rate 1 out of 5</legend>
                    <div className="rate">
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label htmlFor="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label htmlFor="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label htmlFor="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label htmlFor="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label htmlFor="star1" title="text">1 star</label>
                    </div>
                </div>

                <div className="RatingMovie2">
                    <div><b>Spiderman 2023</b></div>
                    <img src="PhotosForWebsite/Action1.jpg" width="200" alt="Action" className="MoviePhoto" />
                    <legend>Rate 1 out of 5</legend>
                    <div className="rate2">
                        <input type="radio" id="star5-2" name="rate2" value="5" />
                        <label htmlFor="star5-2" title="text">5 stars</label>
                        <input type="radio" id="star4-2" name="rate2" value="4" />
                        <label htmlFor="star4-2" title="text">4 stars</label>
                        <input type="radio" id="star3-2" name="rate2" value="3" />
                        <label htmlFor="star3-2" title="text">3 stars</label>
                        <input type="radio" id="star2-2" name="rate2" value="2" />
                        <label htmlFor="star2-2" title="text">2 stars</label>
                        <input type="radio" id="star1-2" name="rate2" value="1" />
                        <label htmlFor="star1-2" title="text">1 star</label>
                    </div>
                </div>
                
                <div className="RatingMovie3">
                    <div><b>The Notebook 2004</b></div>
                    <img src="PhotosForWebsite/Romance1.jpg" width="200" alt="Romance" className="MoviePhoto" />
                    <legend>Rate 1 out of 5</legend>
                    <div className="rate3">
                        <input type="radio" id="star5-3" name="rate3" value="5" />
                        <label htmlFor="star5-3" title="text">5 stars</label>
                        <input type="radio" id="star4-3" name="rate3" value="4" />
                        <label htmlFor="star4-3" title="text">4 stars</label>
                        <input type="radio" id="star3-3" name="rate3" value="3" />
                        <label htmlFor="star3-3" title="text">3 stars</label>
                        <input type="radio" id="star2-3" name="rate3" value="2" />
                        <label htmlFor="star2-3" title="text">2 stars</label>
                        <input type="radio" id="star1-3" name="rate3" value="1" />
                        <label htmlFor="star1-3" title="text">1 star</label>
                    </div>
                </div>
            </div>
            <form className = "ratings-button-1" onSubmit={handleRatingSubmit}>
                <button type="submit" className="btn btn-primary" id="submission">Submit Ratings</button>
            </form>
            <form className = "ratings-button-2" method = "get">
                <button type = "button" className = "btn btn-primary" id = "continue" onClick={recommendationPage}>Continue</button>
            </form>
        </main>
    );
}