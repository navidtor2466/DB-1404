// API Service Layer - Real Database Queries
// This file replaces mockData.ts functions with actual Supabase queries

import { supabase, isSupabaseConfigured } from './supabase';
import * as mockData from '../data/mockData';

// Types
import type { User, Profile, City, Place, Post, Comment, CompanionRequest, CompanionMatch } from '../types/database';

// ============================================
// USER FUNCTIONS
// ============================================

export async function getUsers(): Promise<User[]> {
    if (!isSupabaseConfigured) return mockData.users;

    const { data, error } = await supabase!.from('users').select('*');
    if (error) {
        console.error('Error fetching users:', error);
        return mockData.users;
    }
    return data || [];
}

export async function getUserById(userId: string): Promise<User | undefined> {
    if (!isSupabaseConfigured) return mockData.getUserById(userId);

    const { data, error } = await supabase!
        .from('users')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Error fetching user:', error);
        return mockData.getUserById(userId);
    }
    return data;
}

// ============================================
// PROFILE FUNCTIONS
// ============================================

export async function getProfiles(): Promise<Profile[]> {
    if (!isSupabaseConfigured) return mockData.profiles;

    const { data, error } = await supabase!.from('profiles_with_counts').select('*');
    if (error) {
        console.error('Error fetching profiles:', error);
        return mockData.profiles;
    }
    return data || [];
}

export async function getProfileByUserId(userId: string): Promise<Profile | undefined> {
    if (!isSupabaseConfigured) return mockData.getProfileByUserId(userId);

    const { data, error } = await supabase!
        .from('profiles_with_counts')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Error fetching profile:', error);
        return mockData.getProfileByUserId(userId);
    }
    return data;
}

// ============================================
// CITY FUNCTIONS
// ============================================

export async function getCities(): Promise<City[]> {
    if (!isSupabaseConfigured) return mockData.cities;

    const { data, error } = await supabase!.from('cities').select('*');
    if (error) {
        console.error('Error fetching cities:', error);
        return mockData.cities;
    }
    return data || [];
}

export async function getCityById(cityId: string): Promise<City | undefined> {
    if (!isSupabaseConfigured) return mockData.getCityById(cityId);

    const { data, error } = await supabase!
        .from('cities')
        .select('*')
        .eq('city_id', cityId)
        .single();

    if (error) {
        console.error('Error fetching city:', error);
        return mockData.getCityById(cityId);
    }
    return data;
}

// ============================================
// PLACE FUNCTIONS
// ============================================

export async function getPlaces(): Promise<Place[]> {
    if (!isSupabaseConfigured) return mockData.places;

    const { data, error } = await supabase!
        .from('places')
        .select(`
      *,
      place_features (feature),
      place_images (image_url)
    `);

    if (error) {
        console.error('Error fetching places:', error);
        return mockData.places;
    }

    // Transform the data to match our interface
    return (data || []).map(place => ({
        ...place,
        features: place.place_features?.map((f: any) => f.feature) || [],
        images: place.place_images?.map((i: any) => i.image_url) || []
    }));
}

export async function getPlaceById(placeId: string): Promise<Place | undefined> {
    if (!isSupabaseConfigured) return mockData.getPlaceById(placeId);

    const { data, error } = await supabase!
        .from('places')
        .select(`
      *,
      place_features (feature),
      place_images (image_url)
    `)
        .eq('place_id', placeId)
        .single();

    if (error) {
        console.error('Error fetching place:', error);
        return mockData.getPlaceById(placeId);
    }

    return {
        ...data,
        features: data.place_features?.map((f: any) => f.feature) || [],
        images: data.place_images?.map((i: any) => i.image_url) || []
    };
}

// ============================================
// POST FUNCTIONS
// ============================================

export async function getPosts(): Promise<Post[]> {
    if (!isSupabaseConfigured) return mockData.posts;

    const { data, error } = await supabase!
        .from('posts_with_rating')
        .select(`
      *,
      post_images (image_url)
    `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return mockData.posts;
    }

    return (data || []).map(post => ({
        ...post,
        images: post.post_images?.map((i: any) => i.image_url) || []
    }));
}

export async function getPostsByUserId(userId: string): Promise<Post[]> {
    if (!isSupabaseConfigured) return mockData.getPostsByUserId(userId);

    const { data, error } = await supabase!
        .from('posts_with_rating')
        .select(`
      *,
      post_images (image_url)
    `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching user posts:', error);
        return mockData.getPostsByUserId(userId);
    }

    return (data || []).map(post => ({
        ...post,
        images: post.post_images?.map((i: any) => i.image_url) || []
    }));
}

// ============================================
// COMMENT FUNCTIONS
// ============================================

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
    if (!isSupabaseConfigured) return mockData.getCommentsByPostId(postId);

    const { data, error } = await supabase!
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching comments:', error);
        return mockData.getCommentsByPostId(postId);
    }
    return data || [];
}

// ============================================
// COMPANION REQUEST FUNCTIONS
// ============================================

export async function getCompanionRequests(): Promise<CompanionRequest[]> {
    if (!isSupabaseConfigured) return mockData.companionRequests;

    const { data, error } = await supabase!
        .from('companion_requests')
        .select(`
      *,
      request_conditions (condition)
    `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching companion requests:', error);
        return mockData.companionRequests;
    }

    return (data || []).map(request => ({
        ...request,
        conditions: request.request_conditions?.map((c: any) => c.condition) || []
    }));
}

export async function getRequestsByUserId(userId: string): Promise<CompanionRequest[]> {
    if (!isSupabaseConfigured) return mockData.getRequestsByUserId(userId);

    const { data, error } = await supabase!
        .from('companion_requests')
        .select(`
      *,
      request_conditions (condition)
    `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching user requests:', error);
        return mockData.getRequestsByUserId(userId);
    }

    return (data || []).map(request => ({
        ...request,
        conditions: request.request_conditions?.map((c: any) => c.condition) || []
    }));
}

// ============================================
// COMPANION MATCH FUNCTIONS
// ============================================

export async function getMatchesByRequestId(requestId: string): Promise<CompanionMatch[]> {
    if (!isSupabaseConfigured) return mockData.getMatchesByRequestId(requestId);

    const { data, error } = await supabase!
        .from('companion_matches')
        .select('*')
        .eq('request_id', requestId);

    if (error) {
        console.error('Error fetching matches:', error);
        return mockData.getMatchesByRequestId(requestId);
    }
    return data || [];
}

// ============================================
// EXPORT MOCK DATA FOR BACKWARD COMPATIBILITY
// ============================================

// These are still needed for components that directly import arrays
export const users = mockData.users;
export const profiles = mockData.profiles;
export const cities = mockData.cities;
export const places = mockData.places;
export const posts = mockData.posts;
export const comments = mockData.comments;
export const companionRequests = mockData.companionRequests;
export const companionMatches = mockData.companionMatches;
export const regularUsers = mockData.regularUsers;
export const moderators = mockData.moderators;
export const admins = mockData.admins;
