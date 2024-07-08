import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddressObj } from "@/model/Address";
import { MoreHorizontal } from "lucide-react";
import AlertModal from "@/components/AlertModal";

interface AddressItemProps {
  addr: AddressObj;
  onDelete: (addressId: number) => void;
  onUpdate: (address: AddressObj) => void;
}

const AddressItem: React.FC<AddressItemProps> = ({
  addr,
  onDelete,
  onUpdate,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);

  const handleDeleteClick = (addressId: number) => {
    setAddressToDelete(addressId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (addressToDelete !== null) {
      onDelete(addressToDelete);
    }
    setShowModal(false);
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <div>
          <div className="font-bold text-lg">{addr.user?.fullName}</div>
          <div className="text-gray-600">{addr.user?.phone}</div>
          <div className="text-gray-600">{addr.addressLine}</div>
          <div className="text-gray-600">
            {addr.district}, {addr.city}
          </div>
          {addr.default && (
            <span className="px-1 py-1 border border-red-500 text-red-500 rounded-md bg-none">
              Default
            </span>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="h-8 w-8 p-0 cursor-pointer">
              <MoreHorizontal />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span
                onClick={() => onUpdate(addr)}
                className="text-black bg-transparent cursor-pointer"
              >
                Update
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span
                onClick={() => handleDeleteClick(addr.addressId)}
                className="text-black bg-transparent cursor-pointer"
              >
                Delete
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        body="Are you sure you want to delete this address?"
      />
    </>
  );
};

export default AddressItem;
