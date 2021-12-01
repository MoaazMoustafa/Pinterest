import React, { Component } from "react";
import axios from "axios";
import "./BoardFetchTri.css";

class BoradFetchTrial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
      errormsg: "",
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8000/accounts/api/v1/board/${this.props.id}`)
      .then(response => {
        this.setState({ boards: response.data });
      })
      .catch(error => {
        console.log(error);
        this.setState({ errormsg: "error retreiving data" });
      });
  }

  render() {
    const { boards } = this.state;
    return (
      <div>
        <div className='board-container'>
          {boards.map(board => (
            <section className='Bcontainer' key={board.id}>
              <div className='board-grid' >
                {board.pins.map((pin, index) => (
                  <div key={index}>
                    <div>
                      <img
                        className='board-image2'
                        src={`http://localhost:8000${pin.image}`}
                        alt='board'
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                {board.name}
              </p>
            </section>
          ))}
        </div>
      </div>
    );
  }
}

export default BoradFetchTrial;
