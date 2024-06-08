/* eslint-disable react/prop-types */
const BtnLoader = ({ text }) => {
    return (
        <div>
            <span
                className="spinner-border spinner-border-sm mr-3"
                role="status"
                aria-hidden="true"
            ></span>
            {text}
        </div>
    );
};

export default BtnLoader;
