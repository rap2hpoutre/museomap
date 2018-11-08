import React, { Component } from "react";
import { Marker, Popup } from "react-leaflet";
import Museo from "./Museo";

interface Props {
  item: Museo;
}

const imgUrl = "http://www2.culture.gouv.fr/documentation/museo";
const museoUrl =
  "http://www2.culture.gouv.fr/public/mistral/museo_fr?ACTION=CHERCHER&FIELD_98=REF&VALUE_98=";

class MuseoMarker extends Component<Props> {
  state = {
    hasImg: true
  };
  componentWillMount() {
    const img: string = this.props.item.img;
    this.setState({ hasImg: img !== "" && !img.match(/logo8-v/g) });
  }
  imgDesc() {
    if (this.state.hasImg) {
      return (
        <section>
          <div className="left-50">{this.img(this.props.item.img)}</div>
          <div className="right-50">{this.desc()}</div>
        </section>
      );
    } else {
      return <section>{this.desc()}</section>;
    }
  }
  alert = () => {
    this.setState({ hasImg: false });
  };
  img(img: string) {
    return (
      <img className="picto-musee" onError={this.alert} src={imgUrl + img} />
    );
  }
  desc() {
    const length = this.state.hasImg ? 200 : 400;
    let text = this.props.item.desc;
    if (text.length > length) {
      text = text.substring(0, length) + "…";
    }
    return (
      <p className="description">
        {text}
        <br />
        <a target="_blank" href={museoUrl + this.props.item.id}>
          {" "}
          En savoir plus
        </a>
      </p>
    );
  }
  phone() {
    const phoneNumber = this.props.item.phone;
    if (!phoneNumber) {
      return <span />;
    }
    return (
      <span>
        Tél :{" "}
        <a href={`tel:${phoneNumber.replace("/s/g", "")}`}>{phoneNumber}</a>
      </span>
    );
  }
  address() {
    if (!this.props.item.address) {
      return <span />;
    }
    return (
      <span>
        Adresse : <span>{this.props.item.address}</span>
        <br />
      </span>
    );
  }
  site() {
    if (!this.props.item.url) {
      return <span />;
    }
    return (
      <span>
        Site :{" "}
        <a href={this.props.item.url}>
          {this.props.item.url.substring(0, 20) + "…"}
        </a>
      </span>
    );
  }
  contact() {
    return (
      <address>
        {this.address()}
        <div className="left-50">{this.phone()}</div>
        <div className="right-50">{this.site()}</div>
      </address>
    );
  }
  render() {
    const m: Museo = this.props.item;
    return (
      <Marker position={[m.location.lat, m.location.lon]}>
        <Popup>
          <div className="title">
            <h4>{m.name}</h4>
            <small>{m.topic}</small>
          </div>
          <div>
            {this.imgDesc()}
            {this.contact()}
          </div>
        </Popup>
      </Marker>
    );
  }
}

export default MuseoMarker;
