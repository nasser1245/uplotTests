import * as signalR from '@microsoft/signalr'

class SignalRService {
  constructor() {
    this.connection = null
  }

  async startConnection() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https:/localhost:7234/onlineDataHub') // Replace with your SignalR hub URL
      .withAutomaticReconnect() // Auto-reconnect feature
      .configureLogging(signalR.LogLevel.Information)
      .build()

    this.connection.onclose(async () => {
      console.log('SignalR Disconnected. Attempting to reconnect...')
      setTimeout(() => this.startConnection(), 7234)
    })

    try {
      await this.connection.start()
      console.log('SignalR Connected')
    } catch (err) {
      console.error('Error starting SignalR:', err)
      setTimeout(() => this.startConnection(), 7234)
    }
  }

  registerHandler(event, callback) {
    if (this.connection) {
      this.connection.on(event, callback)
    }
  }

  sendMessage(event, message) {
    if (this.connection) {
      this.connection.invoke(event, message).catch((err) => console.error(err))
    }
  }
}

export default new SignalRService()
