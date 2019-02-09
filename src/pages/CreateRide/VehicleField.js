import React, { Component } from 'react';

import { connectAll } from "../../utils";
import { fetchVehicleTypes } from "../../actions/rides";

import DropDownSelector from '../../components/DropDownSelector';
import Spinner from '../../components/Spinner';


class VehicleField extends Component {
  componentDidMount() {
    this.props.fetchVehicle();
  }

  handleChange = ({ target: { value } }) => {
    this.props.input.onChange(value);
  };

  render() {
    const {
      vehicleTypesStruct,
      input: { value },
    } = this.props;
    if (!vehicleTypesStruct.data) return null;
    if (vehicleTypesStruct.isFetching) return <Spinner/>;

    return (
      <DropDownSelector
        margin="normal"
        options={vehicleTypesStruct.data}
        label="Vehicle type"
        onChange={this.handleChange}
        currentValue={value}
      />
    )
  }

}

const mapStateToProps = ({ rides: { vehicleTypes } }) => ({
  vehicleTypesStruct: vehicleTypes,
});

const mapDispatchToProps = {
  fetchVehicle: fetchVehicleTypes,
};

export default connectAll({
  mapDispatchToProps,
  mapStateToProps,
  isField: true,
})(VehicleField);
