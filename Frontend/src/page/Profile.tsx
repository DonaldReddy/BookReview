import React from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { FaEdit } from "react-icons/fa";
import { api } from "../api";
import Loader from "../components/Loader";
import { authActions } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

export default function Profile() {
    const { id } = useParams();
    const { name, email, role } = useAppSelector((state) => state.auth.user);
    const [toggleEdit, setToggleEdit] = React.useState(false);
    const [user, setUser] = React.useState({
        name: name,
        email: email,
        role: role,
    });
    const [loading, setLoading] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleSave = async () => {
        try {
            setLoading(true);
            const response = await api.put(`/api/v1/users/${id}`, {
                ...user,
            });
            dispatch(authActions.updateUser(response.data));
            toast.success("Profile updated successfully!");
        } catch {
            // No need to use the error variable
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
            setToggleEdit(false);
        }
    };

    return (
        <div className="h-[80dvh] md:min-h-dvh flex items-center justify-center">
            <div className="w-full md:w-2/4  bg-white/80 dark:bg-gray-700 p-6 rounded-lg shadow-md text-black dark:text-gray-100">
                <h1 className="text-4xl font-bold mb-4">Profile</h1>
                <hr className=" border-2" />
                <br />
                <div className="flex flex-col items-center gap-4 border border-black dark:border-gray-500 p-4 rounded-lg">
                    <div>
                        <img
                            src={`https://api.dicebear.com/9.x/personas/svg?seed=${id}`}
                            className="w-12 h-12 rounded-full border-black dark:border-gray-500 border"
                        />
                    </div>
                    <div className="text-xs">id: {id}</div>{" "}
                    {/* Displaying the user ID */}
                    <div className="text-lg">Welcome to your profile!</div>{" "}
                    <div className="w-full flex items-center justify-end gap-2">
                        <FaEdit
                            size={25}
                            className=" cursor-pointer"
                            onClick={() => setToggleEdit(!toggleEdit)}
                        />
                    </div>
                    {!toggleEdit && (
                        <div className="w-full flex flex-col  gap-2">
                            <div className="text-lg bg-blue-100 dark:bg-gray-500 p-2 rounded-xl">
                                Name: {user.name}
                            </div>{" "}
                            <div className="text-lg bg-blue-100 dark:bg-gray-500 p-2 rounded-xl">
                                Email: {user.email}
                            </div>{" "}
                            <div className="text-lg bg-blue-100 dark:bg-gray-500 p-2 rounded-xl">
                                Role: {user.role}
                            </div>{" "}
                        </div>
                    )}
                    {toggleEdit && (
                        <div className="w-full flex flex-col  gap-2">
                            <input
                                className="text-lg bg-blue-100 dark:bg-gray-500 p-2 rounded-xl"
                                placeholder="Name"
                                value={user.name}
                                onChange={(e) => {
                                    setUser({ ...user, name: e.target.value });
                                }}
                            />
                            <input
                                className="text-lg bg-blue-100 dark:bg-gray-500 p-2 rounded-xl"
                                placeholder="Email"
                                value={user.email}
                                disabled
                            />
                            <input
                                className="text-lg bg-blue-100 dark:bg-gray-500 p-2 rounded-xl"
                                placeholder="Role"
                                value={user.role}
                                disabled
                            />
                        </div>
                    )}
                    {toggleEdit && (
                        <button
                            className="bg-black p-2 text-white dark:bg-gray-100 rounded-xl cursor-pointer"
                            onClick={handleSave}
                        >
                            {loading ? <Loader /> : "Save"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
