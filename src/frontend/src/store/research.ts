import { create } from "zustand"
import { ResearchPost } from "../types/types";
import { axiosPrivateClient } from "../actions/config";
import { getURL, serverRoutes } from "../constants";

type ResearchPostsState = {
    researchPosts: ResearchPost[];
}

type Action = {
    getPosts: () => void
}

export const useResearchStore = create<ResearchPostsState & Action>((set) => ({
    researchPosts: [],
    getPosts: async () => {
        const response = await axiosPrivateClient.get(getURL(serverRoutes.feed))

        set({ researchPosts: await response.data })
    }
}))