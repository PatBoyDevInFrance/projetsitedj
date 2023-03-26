<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SoireeController extends AbstractController
{
    #[Route('/soiree', name: 'app_soiree')]
    public function index(): Response
    {
        return $this->render('soiree/index.html.twig', [
            'controller_name' => 'SoireeController',
        ]);
    }
}
