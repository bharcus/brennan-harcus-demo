import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({open, children, ...props}) {

    const modalRef = useRef();

    useEffect(() => {
        if(open) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        }
    }, [open]);
    
    return createPortal(
        <dialog ref={modalRef} className='modal' {...props}>
            <div className='cart'>
                {children}
            </div>
        </dialog>,
        document.getElementById('modal')
    );
}