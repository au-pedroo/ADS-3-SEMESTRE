// Define o pacote ao qual a classe pertence.
package canal;

// Importações de bibliotecas necessárias.
import java.io.*;
import java.net.*;
import java.util.*;

// Declaração da classe Canal.
public class Canal {
    // Variável de socket UDP para enviar e receber pacotes.
    private DatagramSocket socket;
    // Gerador de números aleatórios para simular comportamentos de rede.
    private Random random = new Random();

    // Variáveis para rastrear estatísticas de envio de mensagens.
    private int totalMensagensEnviadas = 0;
    private int totalMensagensEliminadas = 0;
    private int totalMensagensAtrasadas = 0;
    private int totalMensagensDuplicadas = 0;
    private int totalMensagensCorrompidas = 0;
    private int totalMensagensCortadas = 0;

    // Variáveis para armazenar configurações lidas de um arquivo.
    private double probabilidadeEliminar;
    private double probabilidadeDuplicar;
    private double probabilidadeCorromper;
    private int tamanhoMaximoMensagem;
    private long atrasoMensagem; // Ativada para parametrização

    // Construtor da classe Canal. Inicializa o socket e carrega as configurações.
    public Canal(int porta) throws SocketException {
        this.socket = new DatagramSocket(porta);
        carregarConfiguracoes();
    }

    // Método para carregar configurações de um arquivo de propriedades.
    private void carregarConfiguracoes() {
        Properties prop = new Properties();
        String nomeArquivo = "CONFIG.txt";
        File configFile = new File(nomeArquivo);

        // Tenta criar um arquivo de configuração padrão se ele não existir.
        if (!configFile.exists()) {
            try {
                configFile.createNewFile();
                // Define valores padrão para as configurações.
                prop.setProperty("probabilidadeEliminar", "0.04");
                prop.setProperty("probabilidadeDuplicar", "0.03");
                prop.setProperty("probabilidadeCorromper", "0.02");
                prop.setProperty("tamanhoMaximoMensagem", "1024");
                prop.setProperty("atrasoMensagem", "80"); // Valor padrão: 80ms

                // Salva as configurações padrão no arquivo.
                try (FileOutputStream out = new FileOutputStream(nomeArquivo)) {
                    prop.store(out, "Configurações padrão do canal");
                }
            } catch (IOException e) {
                System.err.println("Erro ao criar arquivo de config: " + e.getMessage());
            }
        }

        // Carrega as configurações do arquivo.
        try (FileInputStream in = new FileInputStream(nomeArquivo)) {
            prop.load(in);
            probabilidadeEliminar = Double.parseDouble(prop.getProperty("probabilidadeEliminar", "0.04"));
            probabilidadeDuplicar = Double.parseDouble(prop.getProperty("probabilidadeDuplicar", "0.03"));
            probabilidadeCorromper = Double.parseDouble(prop.getProperty("probabilidadeCorromper", "0.02"));
            tamanhoMaximoMensagem = Integer.parseInt(prop.getProperty("tamanhoMaximoMensagem", "1024"));
            atrasoMensagem = Long.parseLong(prop.getProperty("atrasoMensagem", "80")); // Lendo o atraso
        } catch (IOException e) {
            System.err.println("Erro ao carregar configurações: " + e.getMessage());
        }
    }

    // Método para enviar uma mensagem, aplicando simulações de comportamento de rede.
    public void enviar(String mensagem, InetAddress endereco, int porta) throws IOException {
        // 1. Simula a eliminação de uma mensagem.
        if (random.nextDouble() < probabilidadeEliminar) {
            totalMensagensEliminadas++;
            return;
        }

        // 2. Simula um atraso na entrega da mensagem (Atraso de Rede).
        if (atrasoMensagem > 0) {
            try {
                Thread.sleep(atrasoMensagem);
                totalMensagensAtrasadas++;
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }

        // 3. Simula a duplicação de uma mensagem.
        if (random.nextDouble() < probabilidadeDuplicar) {
            enviarPacote(mensagem, endereco, porta);
            totalMensagensDuplicadas++;
        }

        // 4. Simula a corrupção de uma mensagem.
        if (random.nextDouble() < probabilidadeCorromper) {
            mensagem = corromperMensagem(mensagem);
            totalMensagensCorrompidas++;
        }

        // 5. Corta a mensagem se exceder o tamanho máximo especificado.
        if (mensagem.getBytes().length > tamanhoMaximoMensagem) {
            mensagem = mensagem.substring(0, tamanhoMaximoMensagem);
            totalMensagensCortadas++;
        }

        // 6. Envia a mensagem final.
        enviarPacote(mensagem, endereco, porta);
        totalMensagensEnviadas++;
    }

    // Método privado para enviar um pacote de dados.
    private void enviarPacote(String mensagem, InetAddress endereco, int porta) throws IOException {
        byte[] buffer = mensagem.getBytes();
        DatagramPacket pacote = new DatagramPacket(buffer, buffer.length, endereco, porta);
        socket.send(pacote);
    }

    // Método privado para corromper aleatoriamente um byte de uma mensagem.
    private String corromperMensagem(String mensagem) {
        byte[] bytes = mensagem.getBytes();
        if (bytes.length == 0) return mensagem;
        int byteIndex = random.nextInt(bytes.length);
        bytes[byteIndex] = (byte) (bytes[byteIndex] ^ 0xFF);
        return new String(bytes);
    }

    // Método para exibir estatísticas sobre as mensagens enviadas.
    public void exibirEstatisticas() {
        System.out.println("\n--- ESTATÍSTICAS DO CANAL ---");
        System.out.println("Total de mensagens enviadas (sucesso): " + totalMensagensEnviadas);
        System.out.println("Mensagens eliminadas (perda): " + totalMensagensEliminadas);
        System.out.println("Mensagens atrasadas (lag): " + totalMensagensAtrasadas);
        System.out.println("Mensagens duplicadas: " + totalMensagensDuplicadas);
        System.out.println("Mensagens corrompidas: " + totalMensagensCorrompidas);
        System.out.println("Mensagens cortadas: " + totalMensagensCortadas);
        System.out.println("-----------------------------\n");
    }
}