<?php 
	class Voorraad extends CI_Controller{
		public function index() {
			
			$data['title'] = 'Voorraad items';

			$data['voorraad'] = $this->voorraad_model->get_voorraad();

            $this->load->view('stylesheets/voorraad');
			$this->load->view('templates/header');
			$this->load->view('voorraad/index', $data);
			$this->load->view('templates/footer');
		
		}
		
		public function view($slug = NULL){
			$data['voorraad'] = $this->voorraad_model->get_voorraad($slug);

			if(empty($data['voorraad'])){
				show_404();
			}

			$data['title'] = $data['voorraad']['onderdeel'];

            $this->load->view('stylesheets/voorraad');
			$this->load->view('templates/header');
			$this->load->view('voorraad/view', $data);
			$this->load->view('templates/footer');
		}

		public function maak() {
			$data['title'] = 'Maak voorraad';

			$data['voorraad'] = $this->voorraad_model->krijg_voorraad();
			
			$this->form_validation->set_rules('onderdeel', 'Onderdeel', 'required');
			$this->form_validation->set_rules('beschrijving', 'Beschrijving', 'required');
			$this->form_validation->set_rules('aantal', 'Aantal', 'required');
			$this->form_validation->set_rules('leverancier', 'Leverancier', 'required');
	
			if($this->form_validation->run() === FALSE){

                $this->load->view('stylesheets/front');
				$this->load->view('templates/header');
				$this->load->view('voorraad/maak', $data);
				$this->load->view('templates/footer');
			} else {
				$this->voorraad_model->maak_voorraad();
				redirect('voorraad');
			}
		}

		public function verwijder($id) {
			$this->voorraad_model->delete_voorraad($id);
			redirect('voorraad');
		}


			public function wijzig($slug){

			$data['voorraad'] = $this->voorraad_model->get_voorraad($slug);

			if(empty($data['voorraad'])){
				show_404();
			}

			$data['title'] = 'Pas voorraad aan';
            $this->load->view('stylesheets/wijzig');
			$this->load->view('templates/header');
			$this->load->view('voorraad/wijzig', $data);
			$this->load->view('templates/footer');

			}

			public function update() {
				$this->voorraad_model->update_voorraad();
				redirect('voorraad');
			}

			public function posts($id){

			$data['title'] = $this->voorraadlijst_model->	
			selecteer_voorraadlijst($id)->name;

			$data['producten'] = $this->product_model->selecteer_producten_van_voorraad($id);

                $this->load->view('templates/header');
				$this->load->view('producten/index', $data);
				$this->load->view('templates/footer');
		}
	}
