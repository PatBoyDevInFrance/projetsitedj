<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DiscothequeController extends AbstractController
{
    #[Route('/discotheque', name: 'app_discotheque')]
    public function index(): Response
    {
        return $this->render('discotheque/index.html.twig', [
            'controller_name' => 'DiscothequeController',
        ]);
    }
}
