import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import isEqual from 'lodash/isEqual';
import { validate } from 'wix-rich-content-common';
import schema from '../statics/data-schema.json';

const GoogleMapWrapper = withGoogleMap(props => (
  <GoogleMap
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    center={{ lat: props.lat, lng: props.lng }}
    zoom={props.zoom}
    options={{
      draggable: props.isDraggingAllowed,
      mapTypeId: props.mode,
      zoomControl: props.isZoomControlShown,
      streetViewControl: props.isStreetViewControlShown,
      mapTypeControl: props.isViewControlShown,
    }}
  >
    <Marker
      options={{ visible: props.isMarkerShown }}
      title={props.markerTitle}
      position={{ lat: props.lat, lng: props.lng }}
      onClick={props.onMarkerClick}
    >
      {props.isMarkerTooltipRendered && props.markerTooltipContent.trim() !== '' && (
        <InfoWindow onCloseClick={props.onMarkerTooltipCloseClick}>
          <p style={{ margin: 0 }}>{props.markerTooltipContent}</p>
        </InfoWindow>
      )}
    </Marker>
  </GoogleMap>
));

export class MapViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerTooltipRendered: true,
    };
    validate(props.componentData, schema);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
  }

  componentDidMount() {
    const { width } = this.rootElement.getBoundingClientRect();

    this.props.componentData.config.width = width;

    const MAP_INITIAL_HEIGHT = 400;
    this.props.componentData.config.height = this.props.settings.height || MAP_INITIAL_HEIGHT;
  }

  setRootElementRef = elm => (this.rootElement = elm);

  render() {
    const { componentData, settings, store } = this.props;

    const maxWidth = store.get('editorBounds').width;
    const width = settings.width && maxWidth ? Math.min(settings.width, maxWidth) : 'auto';
    const height = settings.height || 'auto';

    return (
      <div ref={this.setRootElementRef} style={{ width, height }}>
        <ReactGoogleMapLoader
          params={{
            key: componentData.googleMapApiKey,
            libraries: 'geometry,drawing,places',
          }}
          render={googleMaps =>
            googleMaps && (
              <GoogleMapWrapper
                isMarkerShown={componentData.mapSettings.isMarkerShown}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                  <div
                    style={{
                      height: componentData.config.height + 'px',
                      whiteSpace: 'initial',
                      width: componentData.config.width + 'px',
                    }}
                  />
                }
                mapElement={<div style={{ height: `100%` }} />}
                lat={Number(componentData.mapSettings.lat)}
                lng={Number(componentData.mapSettings.lng)}
                markerTitle={componentData.mapSettings.address}
                markerTooltipContent={componentData.mapSettings.locationDisplayName}
                zoom={componentData.mapSettings.zoom}
                onMarkerTooltipCloseClick={() => this.setState({ isMarkerTooltipRendered: false })}
                onMarkerClick={() =>
                  this.setState({ isMarkerTooltipRendered: !this.state.isMarkerTooltipRendered })
                }
                isMarkerTooltipRendered={this.state.isMarkerTooltipRendered}
                mode={componentData.mapSettings.mode}
                isZoomControlShown={componentData.mapSettings.isZoomControlShown}
                isStreetViewControlShown={componentData.mapSettings.isStreetViewControlShown}
                isViewControlShown={componentData.mapSettings.isViewControlShown}
                isDraggingAllowed={componentData.mapSettings.isDraggingAllowed}
                {...this.props}
              />
            )
          }
        />
      </div>
    );
  }
}

MapViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  settings: PropTypes.object,
  store: PropTypes.object,
};
