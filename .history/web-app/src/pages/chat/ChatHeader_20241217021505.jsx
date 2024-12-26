import React from 'react';
import { Phone, Video, MoreVertical } from 'lucide-react';

const ChatHeader = ({ selectedRoom }) => {
    const user = selectedRoom?.user2;

    return (
        <div className="px-6 py-4 border-b flex items-center justify-between bg-white shadow-sm sticky top-0 z-10">
            <div className="flex items-center space-x-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        { console.log(user) }
                            user?.profile?.name || user?.email}
                    </h2>
                    <p className="text-sm text-emerald-500 font-medium">Online</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors">
                    <Phone className="h-5 w-5 text-gray-500" />
                </button>
                <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors">
                    <Video className="h-5 w-5 text-gray-500" />
                </button>
                <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;