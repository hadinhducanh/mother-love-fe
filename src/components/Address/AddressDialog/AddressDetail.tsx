// components/AddressDetail.tsx
import { AddressObj } from "@/model/Address";

interface AddressDetailProps {
  selectedAddress: AddressObj | null;
}

const AddressDetail: React.FC<AddressDetailProps> = ({ selectedAddress }) => {
  return (
    <div className="address-detail">
      {selectedAddress && (
        <>
          <h4 className="font-bold">{selectedAddress?.user?.fullName}</h4>
          <span>{selectedAddress?.user?.phone}, </span>
          <span>{selectedAddress?.addressLine}, </span>
          <span>
            {selectedAddress?.district}, {selectedAddress?.city}
          </span>
        </>
      )}
    </div>
  );
};

export default AddressDetail;
