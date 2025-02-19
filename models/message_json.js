import { getJson } from '../utils/getJson.js';
import crypto from 'node:crypto';

const messages = getJson('messages.json');

export class MessageModel {

    static async getAll() {
        return messages
    }

    static async getById({id}) {
        return messages.find(message => message.id === id)
    }

    static async create({input}) {
        const newMessage = {
            id: crypto.randomUUID(),
            ...input
        };
        messages.push(newMessage)
        return newMessage
    }

    static async delete({id}) {
        const messageIndex = messages.findIndex(message => message.id === id)
        if (messageIndex < 0) return false
        messages.splice(messageIndex, 1)
        return true;
    }

    static async update({id, input}) {
          const messageIndex = messages.findIndex(message => message.id === id)
          if(messageIndex < 0) return false
        
          messages[messageIndex] = {
            ...messages[messageIndex],
            ...input
          }
          return true;
    }
}