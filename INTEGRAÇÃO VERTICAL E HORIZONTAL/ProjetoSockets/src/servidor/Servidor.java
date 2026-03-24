// Declaração do pacote onde a classe está localizada.
package servidor;

// Importações de bibliotecas necessárias para a execução do programa.
import java.io.*;
import java.net.*;
import canal.Canal;

// Declaração da classe Servidor.
public class Servidor {
    // Variáveis para configurar o socket UDP e armazenar a porta do servidor.
    private int porta;
    private DatagramSocket socket;
    private Canal canal; // Objeto Canal para simular comportamento de rede (não utilizado diretamente neste código).
    
//*************************************************************************
// Construtor da classe Servidor. Recebe a porta e inicializa o socket UDP.
public Servidor(int porta) throws SocketException {
        this.porta = porta;
        this.socket = new DatagramSocket(porta);
    }

//*************************************************************************
// Método para iniciar o servidor, ouvindo por mensagens e processando-as.
public void iniciar() {
        System.out.println("Servidor iniciado na porta " + porta + " e aguardando Clientes");
        while (true) {
            try {
                byte[] buffer = new byte[1024]; // Buffer para armazenar dados recebidos.
                DatagramPacket packet = new DatagramPacket(buffer, buffer.length); // Packet para receber os dados.
                socket.receive(packet); // Recebe dados do socket.

                new Thread(new MensagemHandler(packet)).start(); // Processa cada mensagem em uma nova thread.
            } catch (IOException e) {
                System.err.println("Erro ao receber mensagem: " + e.getMessage());
                break; // Sai do loop em caso de erro.
            }
        }
    }

//*************************************************************************
// Classe interna para tratar mensagens recebidas em uma thread separada.
private class MensagemHandler implements Runnable {
        private final DatagramPacket packet;

        // Construtor recebe o pacote UDP a ser processado.
        public MensagemHandler(DatagramPacket packet) {
            this.packet = packet;
        }

        @Override
        public void run() {
            try {
                String mensagem = new String(packet.getData(), 0, packet.getLength()); // Converte bytes para string.
                System.out.println("Mensagem recebida: " + mensagem); // Exibe a mensagem.

                String ackMessage = "ACK"; // Prepara mensagem de ACK.
                byte[] ackData = ackMessage.getBytes(); // Converte ACK para bytes.
                DatagramPacket ackPacket = new DatagramPacket(ackData, ackData.length, packet.getAddress(), packet.getPort()); // Prepara pacote de ACK.
                socket.send(ackPacket); // Envia ACK.
                System.out.println("ACK enviado para a mensagem: " + mensagem);
            } catch (IOException e) {
                System.err.println("Erro ao enviar ACK: " + e.getMessage());
            }
        }
    }

//*************************************************************************
// Método main para executar o servidor. Configura a porta e inicia o servidor.
public static void main(String[] args) throws Exception {
        int porta = 9876; // Porta padrão do servidor.
        // Código para ler a porta do teclado e salvar em arquivo de configuração.
        System.out.println("Digite a PORTA (ex.9876) para o servidor");
        BufferedReader inFromUser = new BufferedReader(new InputStreamReader(System.in));
        try {
            String sPortSt = inFromUser.readLine(); // Lê porta do teclado.
            porta = Integer.parseInt(sPortSt, 10); // Converte para inteiro.
        } catch (IOException e) {
            e.printStackTrace();
        }
        // Inicializa e inicia o servidor.
        try {
            Servidor servidor = new Servidor(porta);
            servidor.iniciar();
        } catch (SocketException e) {
            System.err.println("Erro ao iniciar o servidor: " + e.getMessage());
        }
    }
}
