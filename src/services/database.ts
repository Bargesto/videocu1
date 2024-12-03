import { supabase } from '../config/supabaseClient';
import { User, Video } from '../types';

export const DatabaseService = {
  // Site Settings
  async getSiteSettings() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateSiteSettings(siteName: string, themeColor: string) {
    const { data, error } = await supabase
      .from('site_settings')
      .update({ site_name: siteName, theme_color: themeColor })
      .eq('id', 1)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Videos
  async getVideos(userId: string) {
    const { data, error } = await supabase
      .from('videos')
      .select(`
        *,
        todos (*)
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  },

  async getVideo(videoId: string) {
    const { data, error } = await supabase
      .from('videos')
      .select(`
        *,
        todos (*)
      `)
      .eq('id', videoId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async addVideo(video: Omit<Video, 'id'>) {
    const { data, error } = await supabase
      .from('videos')
      .insert([video])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateVideo(videoId: string, updates: Partial<Video>) {
    const { data, error } = await supabase
      .from('videos')
      .update(updates)
      .eq('id', videoId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteVideo(videoId: string) {
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', videoId);
    
    if (error) throw error;
  },

  // Todos
  async addTodo(videoId: string, text: string) {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ video_id: videoId, text }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateTodo(todoId: string, completed: boolean) {
    const { data, error } = await supabase
      .from('todos')
      .update({ completed })
      .eq('id', todoId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteTodo(todoId: string) {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', todoId);
    
    if (error) throw error;
  }
};