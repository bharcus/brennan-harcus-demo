export default function ErrorModal({ closeDialog, changeModal, error }) {
  let errorMessage = "";

  switch (error) {
    case "Not found":
      errorMessage = (
        <p>The server is currently unavailable, please try again later.</p>
      );
      break;
    case "Missing data: Email, name, street, postal code or city is missing.":
      errorMessage = (
        <p>
          The customer email, name, street, postal code or city is missing.
          Please double check your information and try again.
        </p>
      );
      break;
    case "Missing data.":
      errorMessage = (
        <p>The order data failed to send, please try again later</p>
      );
      break;
    default:
      errorMessage = <p>Something went wrong, please try again later.</p>;
  }

  return (
    <>
      <div>
        <h2>Error!</h2>
      </div>
      <div>{errorMessage}</div>
      <div className="modal-actions">
        {error ===
        "Missing data: Email, name, street, postal code or city is missing." ? (
          <button type="button" className="text-button" onClick={() => changeModal('checkout')}>
            Return to Checkout
          </button>
        ) : (
          <button type="button" className="text-button" onClick={closeDialog}>
            Close
          </button>
        )}
      </div>
    </>
  );
}
