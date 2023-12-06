export default function SuccessModal({closeDialog}) {
  return (
    <>
      <div>
        <h2>Success!</h2>
      </div>
      <div>
        <p>Your order was submitted successfully.</p>
      </div>
      <div>
        <p>
          We will get back to you with more details via email in the next few
          minutes.
        </p>
      </div>
      <div className="modal-actions">
        <button type="button" className="text-button" onClick={closeDialog}>
          Close
        </button>
      </div>
    </>
  );
}
