import React, { useState ,ChangeEvent} from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        phoneno: '',
        password: '',
        profilepicture: '',
        age: '',
        email: '',
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="firstname" className="block text-sm font-medium text-gray-600">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-600">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                    </div>

                    {/* Add similar blocks for other form fields */}

                    <button
                        type="submit"
                        className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring focus:border-primary-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
