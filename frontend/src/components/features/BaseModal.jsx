function BaseModal({children}) {
  return (
    <div className="bg-black/40 backdrop-blur-xs flex justify-center items-center z-999 fixed inset-0">
      <div className="bg-white rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default BaseModal;
