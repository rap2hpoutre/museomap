import React, { Component } from "react";
import { Marker, Popup } from "react-leaflet";
import Museo from "./Museo";

interface Props {
  item: Museo;
}

const imgUrl = "http://www2.culture.gouv.fr/documentation/museo";
const museoUrl =
  "http://www2.culture.gouv.fr/public/mistral/museo_fr?ACTION=CHERCHER&FIELD_98=REF&VALUE_98=";

const withHttp = (url: string) =>
  !/^https?:\/\//i.test(url) ? `http://${url}` : url;

class MuseoMarker extends Component<Props> {
  state = {
    hasImg: true
  };
  componentWillMount() {
    const m: Museo = this.props.item;
    const img: string = m.VIDEO ? `${imgUrl}${m.VIDEO.split(";")[0]}` : "";
    this.setState({ hasImg: img !== "" && !img.match(/logo8-v/g) });
  }
  imgDesc() {
    const m: Museo = this.props.item;
    const img: string = m.VIDEO ? `${imgUrl}${m.VIDEO.split(";")[0]}` : "";
    if (this.state.hasImg) {
      return (
        <section>
          <div className="left-50">{this.img(img)}</div>
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
    return <img className="picto-musee" onError={this.alert} src={img} />;
  }
  desc() {
    const length = this.state.hasImg ? 200 : 400;
    let text = (this.props.item.ATOUT || this.props.item.INTERET)
      .replace(/#/g, "\n")
      .replace(/&quot;/g, '"')
      .replace(/\u0092/g, "'");
    if (text.length > length) {
      text = text.substring(0, length) + "…";
    }
    return (
      <p className="description">
        {text}
        <br />
        <a target="_blank" href={museoUrl + this.props.item.REF}>
          {" "}
          En savoir plus
        </a>
      </p>
    );
  }
  phone() {
    const phoneNumber = this.props.item.TEL_M.replace(
      /^.*?((?:[0-9][0-9]\s*){5}).*$/,
      "$1"
    );
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
    const m: Museo = this.props.item;
    if (!m.CP_M) {
      return <span />;
    }
    return (
      <span>
        Adresse :{" "}
        <span>{[m.ADRL1_M, m.CP_M, m.VILLE_M].filter(a => a).join(", ")}</span>
        <br />
      </span>
    );
  }
  site() {
    const m: Museo = this.props.item;
    if (!m.URL_M) {
      return <span />;
    }
    return (
      <span>
        Site : <a href={withHttp(m.URL_M)}>{m.URL_M.substring(0, 20) + "…"}</a>
      </span>
    );
  }
  contact() {
    const m: Museo = this.props.item;
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
            <h4>{m.NOMOFF}</h4>
            <small>{m.DOMPAL || m.THEMES}</small>
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
