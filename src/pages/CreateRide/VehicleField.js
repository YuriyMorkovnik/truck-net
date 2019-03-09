import React, { useCallback } from 'react';

import { connectAll } from "../../utils";

import DropDownSelector from '../../components/DropDownSelector';


function VehicleField (props) {
  const {
    vehicleTypes,
    input: { value, onChange },
    ...rest
  } = props;
  // componentDidMount() {
  //   this.props.fetchVehicle();
  // }

  const handleChange = useCallback(({ target: { value } }) => {
    onChange(value);
  }, []);
  // if (!vehicleTypesStruct.data) return null;
  // if (vehicleTypesStruct.isFetching) return <Spinner/>;

  return (
    <div {...rest}>
      <DropDownSelector
        margin="normal"
        options={vehicleTypes}
        label="Vehicle type"
        onChange={handleChange}
        currentValue={value}
      />
    </div>
  )

}

// const mapStateToProps = ({ rides: { vehicleTypes } }) => ({
//   vehicleTypesStruct: vehicleTypes,
// });

// const mapDispatchToProps = {
//   fetchVehicle: fetchVehicleTypes,
// };

export default connectAll({
  // mapDispatchToProps,
  // mapStateToProps,
  isField: true,
})(VehicleField);
