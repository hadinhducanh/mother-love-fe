import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
            <button className="px-1 py-1 border border-red-500 text-red-500 rounded-md">
              Default
            </button>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Button
                onClick={() => onUpdate(addr)}
                className="text-black bg-transparent"
              >
                Update
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                onClick={() => handleDeleteClick(addr.addressId)}
                className="text-black bg-transparent"
              >
                Delete
              </Button>
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
