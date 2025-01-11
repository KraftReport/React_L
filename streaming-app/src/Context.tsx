import React, { createContext, useContext, useState } from "react";

export interface VideoIdContextType {
    videoId: string;
    uploadVideoId: React.Dispatch<React.SetStateAction<string>>;
}

const videoIdContext = createContext<VideoIdContextType | undefined>(undefined);

export const VideoIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [videoId, uploadVideoId] = useState<string>("");

    return (
        <videoIdContext.Provider value={{ videoId, uploadVideoId }}>
            {children}
        </videoIdContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useVideoIdUploadContext = () => {
    const context = useContext(videoIdContext);
    if (!context) {
        throw new Error("useUploadContext must be used within an UploadProvider");
    }
    return context;
};
